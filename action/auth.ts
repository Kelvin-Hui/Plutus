'use server';

import { signIn } from '@/auth';
import { getUserByUsername } from '@/data/user';
import prisma from '@/lib/prisma';
import { LoginSchema, RegisterSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export async function login(values: z.infer<typeof LoginSchema>) {
  const parsedCredentials = LoginSchema.safeParse(values);
  if (!parsedCredentials.success) {
    return { error: 'Invalid Credentials' };
  }

  const creadentials = parsedCredentials.data;

  const existingUser = await getUserByUsername(creadentials.username);
  if (!existingUser) return { error: 'User Does Not Exist!' };

  try {
    await signIn('credentials', creadentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials. Please try again.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    throw error;
  } finally{
    revalidateTag('auth')
  }
}

export async function signup(values: z.infer<typeof RegisterSchema>) {
  const parsedCredentials = RegisterSchema.safeParse(values);
  if (!parsedCredentials.success) {
    return { error: 'Invalid Formats!' };
  }

  const { username, password } = parsedCredentials.data;
  const existingUser = await getUserByUsername(username);
  if (existingUser)
    return { error: 'Username Already In Use! Please Pick A New Name' };

  await createUser(username, password);
  return { success: 'User Created 🎉 Signing In Right Now ...' };
}

export async function createUser(username: string, password: string) {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: await bcrypt.hash(password, 10),
        cash: 25000.0,
        wathchList: {
          createMany: {
            data: [
              { symbol: 'META' },
              { symbol: 'AMZN' },
              { symbol: 'AAPL' },
              { symbol: 'NFLX' },
              { symbol: 'GOOG' },
              { symbol: 'SPY' },
              { symbol: 'VOO' },
              { symbol: 'QQQ' },
            ],
          },
        },
        values: {
          create: {
            balance: 25000,
          },
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  } finally{
    revalidateTag('auth')
  }
}
