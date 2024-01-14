import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

function craeteFakeBalanceData(days: number) {
  let chartData = [];
  let baseDate = new Date('2023-01-01');
  let baseAmount = 25000;
  for (let i = 0; i < days; i++) {
    chartData.push({ createdAt: baseDate, balance: baseAmount });
    let nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + 1);
    baseDate = nextDate;
    baseAmount += (Math.random() >= 0.5 ? 1 : -1) * (Math.random() * 2000);
  }
  chartData.push({ createdAt: new Date(), balance: baseAmount });
  return chartData;
}

async function main() {
  const admin1 = await prisma.user.upsert({
    where: { username: 'admin1' },
    update: {},
    create: {
      username: 'admin1',
      password: await bcrypt.hash('admin1', 10),
      cash: 25000.0,
      wathchList: {
        createMany: {
          data: [
            { symbol: 'META' },
            { symbol: 'AMZN' },
            { symbol: 'AAPL' },
            { symbol: 'GOOG' },
            { symbol: 'NFLX' },
            { symbol: 'SPY' },
          ],
        },
      },
      transcations: {
        createMany: {
          data: [
            {
              symbol: 'AAPL',
              quantity: 5,
              cost: 2,
              createdAt: new Date('2024-01-09'),
            },
            {
              symbol: 'AAPL',
              quantity: 5,
              cost: 2,
              createdAt: new Date('2024-01-08'),
            },
            {
              symbol: 'SPY',
              quantity: -10,
              cost: 3,
              createdAt: new Date('2024-01-07'),
            },
            {
              symbol: 'SPY',
              quantity: 20,
              cost: 4,
              createdAt: new Date('2024-01-06'),
            },
            {
              symbol: 'VOO',
              quantity: 20,
              cost: 5,
              createdAt: new Date('2024-01-05'),
            },
            {
              symbol: 'VOO',
              quantity: 15,
              cost: 5,
              createdAt: new Date('2024-01-04'),
            },
          ],
        },
      },
      profolio: {
        createMany: {
          data: [
            { symbol: 'AAPL', quantity: 10, cost: 2 },
            { symbol: 'VOO', quantity: 35, cost: 5 },
            { symbol: 'SPY', quantity: 10, cost: 4 },
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

  const TestBalance1 = await prisma.user.upsert({
    where: { username: 'Test1' },
    update: {},
    create: {
      username: 'Test1',
      password: await bcrypt.hash('admin1', 10),
      cash: 25000.0,
      createdAt: new Date('2022-12-31'),
      wathchList: {
        createMany: {
          data: [
            { symbol: 'META' },
            { symbol: 'AMZN' },
            { symbol: 'AAPL' },
            { symbol: 'GOOG' },
            { symbol: 'NFLX' },
            { symbol: 'SPY' },
          ],
        },
      },
      values: {
        createMany: {
          data: craeteFakeBalanceData(30),
        },
      },
    },
  });

  console.log(admin1);
  console.log(TestBalance1);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
