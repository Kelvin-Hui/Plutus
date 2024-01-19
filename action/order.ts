'use server';

import { getCurrentUserId, getPortfolio } from '@/data/user';
import prisma from '@/lib/prisma';
import { getMarketCloseTime, getMarketOpenTime } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

const VALIDATE_MARKET_HOURS = false;

export async function buyShares(shares: number, symbol: string) {
  const currentTime = new Date();
  const isMarketHours =
    currentTime >= getMarketOpenTime() && currentTime < getMarketCloseTime();

  if (!isMarketHours && VALIDATE_MARKET_HOURS) {
    return { error: 'Market Closed! 🥱' };
  }

  const portfolioData = await getPortfolio(symbol);
  const prevCost = portfolioData[0].cost ?? 0;
  const prevShares = portfolioData[0].quantity ?? 0;
  const currentMarketPrice = portfolioData[0].marketPrice;

  const totalCost = currentMarketPrice * shares;
  const prevTotalCost = prevCost * prevShares;

  const userId = (await getCurrentUserId()) ?? '';

  if (!userId || !currentMarketPrice)
    return { error: 'Something went wrong❌. Please try again.' };

  const [addTransaction, updatePortfolio, updateCash] =
    await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          symbol: symbol,
          quantity: shares,
          cost: currentMarketPrice,
        },
      }),

      prisma.portfolioItem.upsert({
        where: {
          userId_symbol: {
            userId: userId,
            symbol: symbol,
          },
        },
        update: {
          quantity: shares + prevShares,
          cost: (totalCost + prevTotalCost) / (shares + prevShares),
        },
        create: {
          userId: userId,
          quantity: shares + prevShares,
          cost: (totalCost + prevTotalCost) / (shares + prevShares),
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

  revalidateTag('transactions')
  return {
    success: `[Bought] $${currentMarketPrice} @ ${shares} shares of ${symbol}! 🎉 (${new Date().toLocaleString()})`,
  };
}

export async function sellShares(shares: number, symbol: string) {
  const currentTime = new Date();
  const isMarketHours =
    currentTime >= getMarketOpenTime() && currentTime < getMarketCloseTime();

  if (!isMarketHours && VALIDATE_MARKET_HOURS) {
    return { error: 'Market Closed! 🥱' };
  }

  const portfolioData = await getPortfolio(symbol);
  const prevCost = portfolioData[0].cost ?? 0;
  const prevShares = portfolioData[0].quantity ?? 0;
  const currentMarketPrice = portfolioData[0].marketPrice;

  if (shares > prevShares) {
    return { erorr: "Can't Sell More Than You Own ❌" };
  }

  const totalCredit = currentMarketPrice * shares;

  const userId = (await getCurrentUserId()) ?? '';

  const soldAll = shares == prevShares;

  if (!userId || !currentMarketPrice)
    return { error: 'Something went wrong❌. Please try again.' };

  const [addTransaction, updateOrDeletePortfolio, updateCash] =
    await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          symbol: symbol,
          quantity: -shares,
          cost: currentMarketPrice,
        },
      }),

      soldAll
        ? prisma.portfolioItem.delete({
            where: {
              userId_symbol: {
                userId: userId,
                symbol: symbol,
              },
            },
          })
        : prisma.portfolioItem.update({
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

  revalidateTag('transactions')
  return {
    success: `[Sold] $${currentMarketPrice} @ ${shares} shares of ${symbol}! 🎉 (${new Date().toLocaleString()})`,
  };
}
