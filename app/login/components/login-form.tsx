'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { login } from '@/action/auth';
import { FormError } from '@/components/ui/form-error';
import { LoginSchema } from '@/schema';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState, useTransition } from 'react';
import * as z from 'zod';

export function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError('');
    startTransition(() => {
      login(values).then((result) => {
        if (result?.error) {
          form.reset();
          setError(result.error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Loading ... ' : 'Login'}
          {isPending && <ArrowPathIcon className="h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
