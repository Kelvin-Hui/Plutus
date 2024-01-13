'use client';

import { sellShares } from '@/action/order';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { currencyFormat } from '@/lib/utils';
import { ProfolioData } from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function SellForm({
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
  const maxShares = quantity;

  const SellSchema = z.object({
    shares: z.coerce.number().min(1).max(maxShares, {
      message: 'Dont Have Enough Shares',
    }),
    totalCredit: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof SellSchema>>({
    resolver: zodResolver(SellSchema),
    defaultValues: {
      shares: 0,
      totalCredit: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof SellSchema>) {
    const parsedValues = SellSchema.safeParse(values);
    if (!parsedValues.success) {
      form.reset();
      toast.error('Something Went Wrong. Please Try Again');
    } else {
      startTransition(() => {
        sellShares(values.shares, symbol).then((result) => {
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
        <CardDescription>
          <span className="flex flex-col">
            <span>
              Position {quantity}@{currencyFormat(cost)}
            </span>
            <span>Market Price: ${marketPrice}</span>
          </span>
          <span>Available Buying Power: {currencyFormat(cash)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shares</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0"
                      type="number"
                      min={0}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalCredit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Total Credit</FormLabel>
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
                className="w-full bg-red-600"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Sending Order📝 ... Please Wait' : 'Sell'}
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