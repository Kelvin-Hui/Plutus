'use client';

import { buyShares } from '@/action/order';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, currencyFormat } from '@/lib/utils';
import { ProfolioData } from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function BuyForm({
  symbol,
  userId,
  buyingPower,
  profolioData,
}: {
  symbol: string;
  userId: string | undefined;
  buyingPower: number | undefined;
  profolioData: ProfolioData;
}) {
  const [isPending, startTransition] = useTransition();

  const { marketPrice = 0, cost = 0, quantity = 0 } = profolioData;

  const cash = Number(buyingPower) ?? 0;
  const maxShares = Math.floor(cash / marketPrice);

  const BuySchema = z.object({
    shares: z.coerce.number().min(1).max(maxShares, {
      message: 'Dont Have Enough Buying Power!',
    }),
    totalCost: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof BuySchema>>({
    resolver: zodResolver(BuySchema),
    defaultValues: {
      shares: 0,
      totalCost: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof BuySchema>) {
    const parsedValues = BuySchema.safeParse(values);
    if (!parsedValues.success) {
      form.reset();
      toast.error('Something Went Wrong. Please Try Again');
    } else {
      startTransition(() => {
        buyShares(values.shares, symbol).then((result) => {
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success(result.success);
          }
          form.reset();
        });
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="mb-2 flex flex-col text-sm text-muted-foreground">
          <p>
            Position {quantity}@{currencyFormat(cost)}
          </p>
          <p>Market Price: ${marketPrice}</p>
          <p>Available Buying Power: {currencyFormat(cash)}</p>
        </span>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn({
                      'text-red-600': form.control._formState.errors.shares,
                    })}
                  >
                    Shares
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0"
                      type="number"
                      min={0}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Total Cost</FormLabel>
                  <FormControl>
                    <Input
                      value={
                        '$ ' + (form.watch('shares') * marketPrice).toFixed(2)
                      }
                      type="text"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {userId ? (
              <Button
                className="w-full bg-green-500"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Sending Order📝 ... Please Wait' : 'Buy'}
                {isPending && (
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                )}
              </Button>
            ) : (
              <Button className="w-full" onClick={() => redirect('/login')}>
                Sign In First
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
