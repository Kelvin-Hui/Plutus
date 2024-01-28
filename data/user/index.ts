'use server';
import { auth } from '@/auth';
import { getQuotes } from '@/data/stock';
import prisma from '@/lib/prisma';
import { nextDay } from '@/lib/utils';
import { PortfolioValue } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

export const getUserById = cache(
  async (userId: string) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  ['user_id'],
  {
    tags: ['auth', 'transactions'],
  },
);

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

export async function getCurrentUserId() {
  const session = await auth();
  return session?.user.id;
}

export const getWatchListSymbols = cache(
  async (
    userId: string,
    cursor?: { userId: string; symbol: string } | undefined,
    limit?: number,
  ) => {
    const whereFilter = {
      userId: {
        equals: userId,
      },
    };

    const [count, data] = await Promise.all([
      await prisma.watchListItem.count({
        where: whereFilter,
      }),
      await prisma.watchListItem.findMany({
        where: whereFilter,
        cursor: cursor ? { userId_symbol: cursor } : undefined,
        orderBy: {
          createdAt: 'asc',
        },
        take: limit ?? 0,
        skip: cursor ? 1 : 0,
      }),
    ]);

    return { count, data };
  },
  ['get_watch_list'],
  {
    tags: ['watch_list'],
  },
);

export async function checkIfWatchListItemExists(
  userId: string | undefined,
  symbol: string,
) {
  if (!userId) return false;
  const symbolList = await prisma.watchListItem.findUnique({
    where: {
      userId_symbol: {
        userId: userId,
        symbol: symbol,
      },
    },
  });
  return !!symbolList;
}

export const getBalanceChartData = cache(
  async (userId: string, from: Date, to: Date) => {
    const MONTH_IN_SECOND = 30 * 24 * 60 * 60;
    let chartData;
    if ((to.valueOf() - from.valueOf()) / 1000 > MONTH_IN_SECOND) {
      chartData = await prisma.$queryRaw<PortfolioValue[]>`
        SELECT DISTINCT ON (date_trunc('day', "createdAt"))
              "createdAt", "balance"
        FROM "PortfolioValue" 
        WHERE "userId" = ${userId}
        `;
    }

    chartData = await prisma.portfolioValue.findMany({
      where: {
        userId: {
          equals: userId,
        },
        createdAt: {
          gte: from,
          lte: nextDay(to),
        },
      },
      select: {
        balance: true,
        createdAt: true,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    return chartData?.map((row) => {
      return {
        balance: Number(row.balance.toFixed(2)),
        createdAt: row.createdAt,
      };
    });
  },
  ['get_balance_chart'],
  {
    tags: ['auth'],
    revalidate: 60,
  },
);
export const getTransactions = cache(
  async (userId: string | undefined, symbol?: string | undefined) => {
    if (!userId) return [];
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: {
          equals: userId,
        },
        symbol: {
          equals: symbol,
        },
      },
      select: {
        symbol: true,
        quantity: true,
        cost: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return transactions?.map((row) => {
      return { ...row, cost: Number(row.cost) };
    });
  },
  ['get_transactions'],
  {
    tags: ['transactions'],
  },
);

export const getPortfolioList = cache(
  async (userId: string | undefined, symbol?: string | undefined) => {
    const portfolio = await prisma.portfolioItem.findMany({
      where: {
        userId: {
          equals: !userId ? '0' : userId,
        },
        symbol: {
          equals: symbol,
        },
      },
      select: {
        symbol: true,
        quantity: true,
        cost: true,
      },
    });
    return portfolio;
  },
  ['get_portfolio_list'],
  {
    tags: ['transactions', 'auth'],
  },
);

export async function getPortfolio(
  userId: string | undefined,
  symbol?: string | undefined,
) {
  const portfolio = await getPortfolioList(userId, symbol);
  const symbolList = portfolio?.map((item) => item.symbol);
  if (portfolio.length === 0) {
    if (!!symbol) {
      symbolList.push(symbol);
    } else {
      return [];
    }
  }
  if (portfolio.length === 0 && !!symbol) symbolList.push(symbol);
  const marketPrices = await getQuotes(symbolList);

  const castedPortfolio = portfolio.map((row) => {
    return { ...row, cost: Number(row.cost) };
  });
  return symbolList?.map((_, idx) => {
    return {
      marketPrice: marketPrices[idx]?.regularMarketPrice,
      marketChange: marketPrices[idx]?.regularMarketChange,
      marketPreviousClose: Number(
        marketPrices[idx]?.regularMarketPreviousClose,
      ),
      ...castedPortfolio[idx],
    };
  });
}

export async function getPortfolioValue(id: string) {
  const portfolio = await getPortfolio(id);
  return portfolio.reduce(
    (acc, curr) => acc + curr.marketPrice * curr.quantity,
    0,
  );
}

export async function computeTotalPortfolioValue(userId: string) {
  const [user, portfolioValue] = await Promise.all([
    getUserById(userId),
    getPortfolioValue(userId),
  ]);
  const cash = Number(user?.cash);
  return {
    userId: userId,
    balance: Number((cash + portfolioValue).toFixed(2)),
  };
}
