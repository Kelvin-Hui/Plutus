'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getBalanceChartData,
  getPortfolioValue,
  getUserById,
} from '@/data/user';
import {
  cn,
  currencyFormat,
  determineYAxisWidth,
  percentageFormat,
} from '@/lib/utils';
import {
  AreaChart,
  BadgeDelta,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react';
import { useEffect, useState, useTransition } from 'react';

interface BalanceHeaderProps {
  totalBalance: number;
  PNL: number;
  PNLpercentage: number;
  isIncreasing: boolean;
}

export function BalanceHeader({
  balanceInfo,
}: {
  balanceInfo: BalanceHeaderProps;
}) {
  const { totalBalance, PNL, PNLpercentage, isIncreasing } = balanceInfo;
  return (
    <div
      className={cn('flex flex-col items-center space-y-2 text-green-600', {
        'text-red-600': !isIncreasing,
      })}
    >
      <h1 className="text-4xl sm:text-7xl">{currencyFormat(totalBalance)}</h1>
      <div className="flex w-full justify-evenly">
        <span className="text-xl sm:text-3xl">{currencyFormat(PNL)}</span>
        <BadgeDelta
          deltaType={isIncreasing ? 'moderateIncrease' : 'moderateDecrease'}
          size={'xl'}
        >
          {percentageFormat(PNLpercentage)}
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

export function BalanceChart({ userId }: { userId: string }) {
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
  const [chartData, setChartData] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      const [chartData, user, portfolioValue] = await Promise.all([
        getBalanceChartData(
          userId,
          range.from ?? dateMidnight(),
          range.to ?? dateMidnight(),
        ),
        getUserById(userId),
        getPortfolioValue(userId),
      ]);
      const cash = Number(user?.cash);

      const isToday = range.from?.getDate() === range.to?.getDate();

      if (isToday) {
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
            createdAt: new Date(entry.createdAt).toLocaleString('en-US', {
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

    startTransition(() => fetchData().catch(console.error));

    // fetchData().catch(console.error);
  }, [range]);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Balance Chart</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <BalanceHeader balanceInfo={balanceInfo} />
        <div className="my-5 flex flex-col items-center px-1 sm:flex-row sm:justify-center">
          <DateRangePicker
            enableYearNavigation={true}
            enableClear={false}
            value={range}
            maxDate={new Date()}
            onValueChange={(range) =>
              setRange({ from: range?.from, to: range?.to })
            }
            className="p-0"
            disabled={isPending}
          />
          <Button
            className="w-full sm:w-fit"
            variant="outline"
            disabled={isPending}
            onClick={() => {
              const fetchCreated = async () => {
                const user = await getUserById(userId);
                if (!user) return;
                const createTime = user.createdAt;

                setRange({ from: new Date(createTime), to: new Date() });
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
          yAxisWidth={determineYAxisWidth(chartData.slice(-1)[0]?.balance)}
          className="min-h-[20rem]"
          noDataText="Loading Data ... 🔄"
        />
      </CardContent>
    </Card>
  );
}
