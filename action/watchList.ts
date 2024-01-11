'use server';

import prisma from '@/lib/prisma';

export async function createWatchListItem(symbol: string, userId: string) {
  const createdWatchListItem = await prisma.watchListItem.create({
    data: {
      symbol: symbol,
      userId: userId,
    },
  });
}

export async function deleteWatchListItem(symbol: string, userId: string) {
  const deletedWatchListItem = await prisma.watchListItem.delete({
    where: {
      userId_symbol: {
        userId: userId,
        symbol: symbol,
      },
    },
  });
}
