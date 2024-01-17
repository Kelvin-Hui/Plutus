import { computeTotalProfolioValue } from '@/data/user';
import prisma from '@/lib/prisma';
import { isMarketHours } from '@/lib/utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthroized', {
      status: 401,
    });
  }

  if(!isMarketHours()) return new Response('Market Closed', {status : 202})

  const allUserId = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const computedData = await Promise.all(
    allUserId.map(async (user) => await computeTotalProfolioValue(user.id)),
  );

  await prisma.profolioValue.createMany({
    data: computedData,
  });

  return Response.json({
    success: true,
  });
}
