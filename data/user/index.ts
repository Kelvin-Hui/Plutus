'use server';
import { auth } from '@/auth';
import { getQuotes } from '@/data/stock';
import prisma from '@/lib/prisma';
import { convertToISO, nextDay } from '@/lib/utils';
import { ProfolioValue } from '@prisma/client';
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
    return new Date(result.createdAt)
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
  {tags : ['watch_list']}
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

export async function getBalanceChartData(from: Date, to: Date) {
  const userId = await getCurrentUserId();
  const MONTH_IN_SECOND = 30 * 24 * 60 * 60;

  if ((to.valueOf() - from.valueOf()) / 1000 > MONTH_IN_SECOND) {
    const data = await prisma.$queryRaw<ProfolioValue[]>`
    SELECT DISTINCT ON (date_trunc('day', "createdAt"))
          "createdAt", "balance"
    FROM "ProfolioValue" 
    WHERE "userId" = ${userId}
    `;
    return data?.map((row) => {
      return {
        balance: Number(row.balance.toFixed(2)),
        createdAt: row.createdAt,
      };
    });
  }

  const chartData = await prisma.profolioValue.findMany({
    where: {
      userId: {
        equals: userId,
      },
      createdAt: {
        gte: convertToISO(from),
        lte: convertToISO(nextDay(to)),
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
}

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

export const getProfolioList = cache(
  async(symbol?: string | undefined, id?: string) => {
    const userId = id ?? (await getCurrentUserId());
    const profolio = await prisma.profolioItem.findMany({
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
    return profolio
  },
  ['get_profolio_list'],
  {tags : ['auth','transactions']}
)

export async function getProfolio(symbol?: string | undefined, id?: string) {
  const profolio = await getProfolioList(symbol,id)
  const symbolList = profolio?.map((item) => item.symbol);
  if (profolio.length === 0) {
    if (!!symbol) {
      symbolList.push(symbol);
    } else {
      return [];
    }
  }
  if (profolio.length === 0 && !!symbol) symbolList.push(symbol);
  const marketPrices = await getQuotes(symbolList);

  const castedProfolio = profolio.map((row) => {
    return { ...row, cost: Number(row.cost) };
  });
  return symbolList?.map((_, idx) => {
    return {
      marketPrice: marketPrices[idx]?.regularMarketPrice,
      marketChange: marketPrices[idx]?.regularMarketChange,
      marketPreviousClose: Number(
        marketPrices[idx]?.regularMarketPreviousClose,
      ),
      ...castedProfolio[idx],
    };
  });
}

export async function getProfolioValue(id?: string) {
  const profolio = await getProfolio(undefined, id);
  return profolio.reduce(
    (acc, curr) => acc + curr.marketPrice * curr.quantity,
    0,
  );
}

export async function computeTotalProfolioValue(userId: string) {
  const id = userId ?? (await getCurrentUserId());
  const [cash, profolioValue] = await Promise.all([
    getBuyingPower(userId),
    getProfolioValue(userId),
  ]);
  return { userId: id, balance: Number((cash + profolioValue).toFixed(2)) };
}
