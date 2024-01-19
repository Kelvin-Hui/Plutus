'use server';
import { auth } from '@/auth';
import { getQuotes } from '@/data/stock';
import prisma from '@/lib/prisma';
import { nextDay } from '@/lib/utils';
import { PortfolioValue } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

export async function getUserById(userId: string | undefined) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}
export const getCurrentUserId = cache(
  async () => {
    const session = await auth();
    return session?.user.id;
  },
  ['current_user'],
  {tags:['auth']}
)

export const getUserCreateTime = cache(
  async () => {
    const result = await getUserById(await getCurrentUserId());
    if(!result) throw Error("User cant be null!")
    return result.createdAt
  },
  ['current_user_create_time'],
  {tags:['auth']}
)

export const getBuyingPower = cache(
  async (id? : string) => {
    const userId = id ?? (await getCurrentUserId());
  if (!userId) return 0;
  const obj = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      cash: true,
    },
  });
    return Number(obj?.cash);
  },
  ['get_buying_power'],
  {tags:['transactions','auth']}
)

export const getWatchListSymbols = cache(
  async (cursor?:{userId: string, symbol : string}|undefined, limit?:number) => {
    const userId = await getCurrentUserId();
    const whereFilter = {
      userId : {
        equals : userId,
      }
    }

    const [count, data] = await Promise.all([
      await prisma.watchListItem.count({
        where : whereFilter
      }),
      await prisma.watchListItem.findMany({
        where : whereFilter,
        cursor: cursor? {userId_symbol:cursor} : undefined,
        orderBy:{
          createdAt: 'asc'
        },
        take : limit ?? 0,
        skip : cursor ? 1 : 0
      })
    ])

    return {count, data};
  },
  ['get_watch_list'],
  {tags : ['watch_list', 'auth']}
)

export const checkIfWatchItemExists = cache(
  async (symbol : string) => {
    const userId = await getCurrentUserId();
  if(!userId) throw Error("User Doesn't Exist!") 
  const symbolList = await prisma.watchListItem.findUnique({
    where: {
      userId_symbol: {
        userId: userId,
        symbol: symbol
      },
    },
  });
  return !!symbolList
  },
  ['check_watch_list'],
  {tags: ['watch_list']}
)


export const getBalanceChartData = cache(
  async (from: Date, to: Date) => {
    const userId = await getCurrentUserId();
    const MONTH_IN_SECOND = 30 * 24 * 60 * 60;

    if ((to.valueOf() - from.valueOf()) / 1000 > MONTH_IN_SECOND) {
      const data = await prisma.$queryRaw<PortfolioValue[]>`
      SELECT DISTINCT ON (date_trunc('day', "createdAt"))
            "createdAt", "balance"
      FROM "PortfolioValue" 
      WHERE "userId" = ${userId}
      `;
      return data?.map((row) => {
        return {
          balance: Number(row.balance.toFixed(2)),
          createdAt: row.createdAt,
        };
      });
    }

    const chartData = await prisma.portfolioValue.findMany({
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
  ['get_balance_chart_data'],
  {tags:['auth'],revalidate: 60}
)

export const getTransactions  = cache(
  async (symbol?: string | undefined) => {
    const userId = await getCurrentUserId();
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
  {tags:['auth','transactions']}
)

export const getPortfolioList = cache(
  async(symbol?: string | undefined, id?: string) => {
    const userId = id ?? (await getCurrentUserId());
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
    return portfolio
  },
  ['get_portfolio_list'],
  {tags : ['auth','transactions']}
)

export async function getPortfolio(symbol?: string | undefined, id?: string) {
  const portfolio = await getPortfolioList(symbol,id)
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

export async function getPortfolioValue(id?: string) {
  const portfolio = await getPortfolio(undefined, id);
  return portfolio.reduce(
    (acc, curr) => acc + curr.marketPrice * curr.quantity,
    0,
  );
}

export async function computeTotalPortfolioValue(userId: string) {
  const id = userId ?? (await getCurrentUserId());
  const [cash, portfolioValue] = await Promise.all([
    getBuyingPower(userId),
    getPortfolioValue(userId),
  ]);
  return { userId: id, balance: Number((cash + portfolioValue).toFixed(2)) };
}
