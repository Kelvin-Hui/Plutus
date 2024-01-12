import { auth } from '@/auth';
import { getQuote } from '@/data/stock';
import prisma from '@/lib/prisma';

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

export async function getCurrentUserId() {
  const session = await auth();
  return session?.user?.id;
}

export async function getBuyingPower(id?: string) {
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
}

export async function getWatchListSymbols() {
  const userId = await getCurrentUserId();
  const symbolList = await prisma.watchListItem.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    select: {
      symbol: true,
    },
  });
  return symbolList?.map((row) => row.symbol);
}

export async function getBalanceChartData() {
  const userId = await getCurrentUserId();
  const chartData = await prisma.profolioValue.findMany({
    where: {
      userId: {
        equals: userId,
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
      balance: row.balance.toFixed(2),
      createdAt: row.createdAt.toLocaleDateString(),
    };
  });
}

export async function getTranscations(symbol?: string | undefined) {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  const transcations = await prisma.transcation.findMany({
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
  return transcations?.map((row) => {
    return { ...row, cost: Number(row.cost) };
  });
}

export async function getProfolio(symbol?: string | undefined, id?: string) {
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
  const symbolList = profolio?.map((item) => item.symbol);
  if (profolio.length === 0) {
    if (!!symbol) {
      symbolList.push(symbol);
    } else {
      return [];
    }
  }
  if (profolio.length === 0 && !!symbol) symbolList.push(symbol);
  const marketPrices = await getQuote(symbolList);

  const castedProfolio = profolio.map((row) => {
    return { ...row, cost: Number(row.cost) };
  });
  return symbolList?.map((_, idx) => {
    return {
      marketPrice: marketPrices[idx].regularMarketPrice,
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
  const [cash, profolioValue] = await Promise.all([
    getBuyingPower(userId),
    getProfolioValue(userId),
  ]);
  return cash + profolioValue;
}
