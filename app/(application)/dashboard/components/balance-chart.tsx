import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getBalanceChartData,
  getBuyingPower,
  getProfolioValue,
} from '@/data/user';
import { cn, currencyFormat } from '@/lib/utils';
import { AreaChart, BadgeDelta } from '@tremor/react';

const START_BALANCE = 25000;

export async function BalanceHeader() {
  const [cash, profolioValue] = await Promise.all([
    getBuyingPower(),
    getProfolioValue(),
  ]);
  const totalBalance = cash + profolioValue;
  const PNL = totalBalance - START_BALANCE;
  const PNLpercentage = (PNL / START_BALANCE) * 100;
  const increasing = PNL >= 0;
  return (
    <div className="flex justify-around">
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">Profolio Value</label>
        <span>{currencyFormat(totalBalance)}</span>
      </div>
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">PNL</label>
        <span className={cn('text-green-600', { 'text-red-600': !increasing })}>
          {currencyFormat(PNL)}
        </span>
      </div>
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">ROI</label>
        <BadgeDelta
          deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
          size={'xl'}
        >
          {increasing && '+'}
          {PNLpercentage.toFixed(2)}%
        </BadgeDelta>
      </div>
    </div>
  );
}

export async function BalanceChart() {
  const chartData = await getBalanceChartData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance History</CardTitle>
      </CardHeader>
      <CardContent>
        <BalanceHeader />
        <AreaChart
          data={chartData}
          index="createdAt"
          categories={['balance']}
          colors={['green']}
          autoMinValue={true}
          curveType="monotone"
          connectNulls={true}
        />
      </CardContent>
    </Card>
  );
}
