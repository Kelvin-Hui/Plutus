'use server';

import { getCurrentUser, getProfolio } from '@/data/user';
import prisma from '@/lib/prisma';
import { getMarketCloseTime, getMarketOpenTime } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function buyShares(shares: number, symbol: string) {
  const currentTime = new Date();
  const isMarketHours =
    currentTime >= getMarketOpenTime() && currentTime < getMarketCloseTime();

  if (!isMarketHours) {
    return { error: 'Market Closed! 🥱' };
  }

  const profolioData = await getProfolio(symbol);
  const prevCost = profolioData[0].cost ?? 0;
  const prevShares = profolioData[0].quantity ?? 0;
  const currentMarketPrice = profolioData[0].marketPrice;

  const totalCost = currentMarketPrice * shares;

  const user = await getCurrentUser();
  const userId = user?.id ?? '';

  const [addTranscation, updateProfolio, updateCash] =
    await prisma.$transaction([
      prisma.transcation.create({
        data: {
          userId: userId,
          symbol: symbol,
          quantity: shares,
          cost: currentMarketPrice,
        },
      }),

      prisma.profolioItem.upsert({
        where: {
          userId_symbol: {
            userId: userId,
            symbol: symbol,
          },
        },
        update: {
          quantity: shares + prevShares,
          cost: (totalCost + prevCost) / (shares + prevShares),
        },
        create: {
          userId: userId,
          quantity: shares + prevShares,
          cost: (totalCost + prevCost) / (shares + prevShares),
          symbol: symbol,
        },
      }),

      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          cash: {
            decrement: totalCost,
          },
        },
      }),
    ]);

  revalidatePath(`/stock/${symbol}`);
  return {
    success: `Bought ${shares}@$${currentMarketPrice} shares of ${symbol}! 🎉 (${new Date().toLocaleString()})`,
  };
}

export async function sellShares(shares: number, symbol: string) {
  const currentTime = new Date();
  const isMarketHours =
    currentTime >= getMarketOpenTime() && currentTime < getMarketCloseTime();

  if (!isMarketHours) {
    return { error: 'Market Closed! 🥱' };
  }

  const profolioData = await getProfolio(symbol);
  const prevCost = profolioData[0].cost ?? 0;
  const prevShares = profolioData[0].quantity ?? 0;
  const currentMarketPrice = profolioData[0].marketPrice;

  if (shares > prevShares) {
    return { erorr: "Can't Sell More Than You Own ❌" };
  }

  const totalCredit = currentMarketPrice * shares;

  const user = await getCurrentUser();
  const userId = user?.id ?? '';

  const soldAll = shares == prevShares;

  const [addTranscation, updateOrDeleteProfolio, updateCash] =
    await prisma.$transaction([
      prisma.transcation.create({
        data: {
          userId: userId,
          symbol: symbol,
          quantity: -shares,
          cost: currentMarketPrice,
        },
      }),

      soldAll
        ? prisma.profolioItem.delete({
            where: {
              userId_symbol: {
                userId: userId,
                symbol: symbol,
              },
            },
          })
        : prisma.profolioItem.update({
            where: {
              userId_symbol: {
                userId: userId,
                symbol: symbol,
              },
            },
            data: {
              quantity: {
                decrement: shares,
              },
            },
          }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          cash: {
            increment: totalCredit,
          },
        },
      }),
    ]);

  revalidatePath(`/stock/${symbol}`);
  return {
    success: `Sold ${shares}@$${currentMarketPrice} shares of ${symbol}! 🎉 (${new Date().toLocaleString()})`,
  };
}
