'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    getBalanceChartData,
    getBuyingPower,
    getPortfolioValue,
    getUserCreateTime,
} from '@/data/user';
import { cn, currencyFormat } from '@/lib/utils';
import { BalanceHeaderProps } from '@/types';
import {
    AreaChart,
    BadgeDelta,
    DateRangePicker,
    DateRangePickerValue,
} from '@tremor/react';
import { useEffect, useState } from 'react';

export function BalanceHeader({
  balanceInfo,
}: {
  balanceInfo: BalanceHeaderProps;
}) {
  const { totalBalance, PNL, PNLpercentage, isIncreasing } = balanceInfo;
  return (
    <div className="flex justify-around">
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">Portfolio Value</label>
        <span>{currencyFormat(totalBalance)}</span>
      </div>
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">PNL</label>
        <span
          className={cn('text-green-600', { 'text-red-600': !isIncreasing })}
        >
          {currencyFormat(PNL)}
        </span>
      </div>
      <div className="flex flex-col items-center text-xl">
        <label className="mb-2 font-semibold underline">ROI</label>
        <BadgeDelta
          deltaType={isIncreasing ? 'moderateIncrease' : 'moderateDecrease'}
          size={'xl'}
        >
          {isIncreasing && '+'}
          {PNLpercentage.toFixed(2)}%
        </BadgeDelta>
      </div>
    </div>
  );
}

function dateMidnight() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function BalanceChart() {
  const [range, setRange] = useState<DateRangePickerValue>({
    from: dateMidnight(),
    to: dateMidnight(),
  });
  const [balanceInfo, setBalanceInfo] = useState<BalanceHeaderProps>({
    totalBalance: 0,
    PNL: 0,
    PNLpercentage: 0,
    isIncreasing: true,
  });
  const [chartData, setChartData] = useState<Object[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [chartData, cash, portfolioValue] = await Promise.all([
        getBalanceChartData(
          range.from ?? dateMidnight(),
          range.to ?? dateMidnight(),
        ),
        getBuyingPower(),
        getPortfolioValue(),
      ]);

      const isToday = range.from?.getDate() === range.to?.getDate();

      if(isToday){
        chartData.push({
          createdAt: new Date(),
          balance: Number((cash + portfolioValue).toFixed(2)),
        });
      }
      

      const totalBalance = isToday
        ? Number((cash + portfolioValue).toFixed(2))
        : chartData.slice(-1)[0]?.balance;
      const startBalance = chartData[0].balance;

      const PNL = totalBalance - startBalance;
      const PNLpercentage = (PNL / startBalance) * 100;
      const isIncreasing = PNL >= 0;

      setBalanceInfo({ totalBalance, PNL, PNLpercentage, isIncreasing });
      setChartData(
        chartData.map((entry) => {
          return {
            ...entry,
            createdAt: entry.createdAt.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
          };
        }),
      );
    };

    fetchData().catch(console.error);
  }, [range]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance History</CardTitle>
      </CardHeader>
      <CardContent>
        <BalanceHeader balanceInfo={balanceInfo} />
        <div className="mt-2 flex items-center justify-center">
          <DateRangePicker
            enableYearNavigation={true}
            enableClear={false}
            value={range}
            maxDate={new Date()}
            onValueChange={(range) =>
              setRange({ from: range?.from, to: range?.to })
            }
          />
          <Button
            variant="outline"
            onClick={() => {
              const fetchCreated = async () => {
                const minRange = await getUserCreateTime();
                
                setRange({ from: new Date(minRange), to: new Date() });
              };
              fetchCreated().catch(console.error);
            }}
          >
            Entire Range
          </Button>
        </div>
        <AreaChart
          data={chartData}
          index="createdAt"
          categories={['balance']}
          colors={[balanceInfo.isIncreasing ? 'green' : 'red']}
          autoMinValue={true}
          curveType="monotone"
          connectNulls={true}
          showXAxis={false}
          showAnimation
          animationDuration={2000}
          valueFormatter={currencyFormat}
          yAxisWidth={75}
          className="min-h-[20rem]"
          noDataText="Loading Data ... 🔄"
        />
      </CardContent>
    </Card>
  );
}
