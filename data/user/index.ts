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

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function getBuyingPower() {
  const user = await getCurrentUser();
  if (!user?.id) return 0;
  const obj = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      cash: true,
    },
  });
  return Number(obj?.cash);
}

export async function getWatchListSymbols() {
  const user = await getCurrentUser();
  const symbolList = await prisma.watchListItem.findMany({
    where: {
      userId: {
        equals: user?.id,
      },
    },
    select: {
      symbol: true,
    },
  });
  return symbolList?.map((row) => row.symbol);
}

export async function getBalanceChartData() {
  const user = await getCurrentUser();
  const chartData = await prisma.profolioValue.findMany({
    where: {
      userId: {
        equals: user?.id,
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
  const user = await getCurrentUser();
  if (!user?.id) return [];
  const transcations = await prisma.transcation.findMany({
    where: {
      userId: {
        equals: user?.id,
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

export async function getProfolio(symbol?: string | undefined) {
  const user = await getCurrentUser();
  const profolio = await prisma.profolioItem.findMany({
    where: {
      userId: {
        equals: !user?.id ? '0' : user?.id,
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
