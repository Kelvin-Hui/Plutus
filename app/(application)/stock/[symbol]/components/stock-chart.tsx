'use client';
import { get1minChartData, getChartData, getQuotes } from '@/data/stock';
import {
  cn,
  currencyFormat,
  isMobileView,
  numberFormat,
  padChartData,
} from '@/lib/utils';
import { TimeInterval } from '@/types';

import { AreaChart, BarChart, Tab, TabGroup, TabList } from '@tremor/react';
import { useEffect, useState } from 'react';

function determineYAxisWidth(value: number | undefined) {
  if (value === undefined) return 56;
  const numOfDigits = value.toString().split('.')[0].length;
  switch (numOfDigits) {
    case 1:
      return 40;
    case 2:
      return 48;
    case 3:
      return 56;
    case 4:
      return 64;
    case 5:
      return 72;
    case 6:
      return 80;
    case 7:
      return 88;
    default:
      throw Error('Value Too High😵');
  }
}

export function StockChart({ symbol }: { symbol: string }) {
  const TimeInterval: TimeInterval[] = [
    '1d',
    '5d',
    '1m',
    '6m',
    'YTD',
    '1y',
    '5y',
    'Max',
  ];

  const [maxVolume, setMaxVolume] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('1d');
  const [increasing, setIncreasing] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [quote, chartData] = await Promise.all([
        getQuotes(symbol),
        timeInterval === '1d'
          ? get1minChartData(symbol)
          : getChartData(symbol, timeInterval),
      ]);

      const { marketState } = quote;

      const isRegularMarket = marketState === 'REGULAR';
      const is1dInterval = timeInterval === '1d';
      if (!chartData) return null;

      const localeChartData = (
        isRegularMarket && is1dInterval ? padChartData(chartData) : chartData
      ).map((data: any) => {
        return {
          ...data,
          date: is1dInterval
            ? new Date(data.date).toLocaleTimeString()
            : new Date(data.date).toLocaleDateString(),
        };
      });

      setMaxVolume(
        Math.max(...chartData.map((data: any) => Number(data.volume))),
      );
      setChartData(localeChartData);
      setIncreasing((quote?.regularMarketChangePercent ?? 0) >= 0);
    };

    fetchData().catch(console.error);
  }, [timeInterval, symbol]);

  const valueFormatter = (value: number) => {
    return currencyFormat(value);
  };

  const customToolTip = (props: any) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-40 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown lg:w-56 dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown">
        {payload.map((category: any, idx: number) => {
          const color = category.color;
          const { date: dateStr } = category.payload;
          const fields = ['open', 'high', 'low', 'close', 'volume'];

          const date = new Date(dateStr);
          const isMidNight = [4, 5].includes(date.getUTCHours());

          return (
            //[&_div]:hidden
            <div
              key={idx}
              className="flex flex-1 flex-col [&>div:nth-of-type(4)]:flex [&>div:nth-of-type(5)]:flex [&>div]:hidden lg:[&>div]:flex"
            >
              <p className="m-2">
                {timeInterval === '1d'
                  ? dateStr
                  : isMidNight
                    ? date.toLocaleDateString()
                    : date.toLocaleString()}
              </p>
              <p className="h-[1px] w-full shrink bg-border"></p>

              {fields.map((field) => {
                const value = category.payload[field];
                return (
                  <div key={field} className="flex justify-between space-y-2">
                    <div className="flex items-center space-x-1">
                      <span
                        className={cn(
                          'h-3 w-3 shrink-0 rounded-tremor-full border-2',
                          `bg-${color}-500`,
                          'border-tremor-background shadow-tremor-card',
                          'dark:border-dark-tremor-background dark:shadow-dark-tremor-card',
                        )}
                      ></span>
                      <label>{field}</label>
                    </div>
                    <p>
                      {field === 'volume'
                        ? numberFormat(value)
                        : valueFormatter(value)}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="tremor-card relative items-center rounded-tremor-default border-tremor-brand bg-tremor-background shadow-tremor-card ring-1 ring-tremor-ring md:col-span-2 lg:p-6 dark:border-dark-tremor-brand dark:bg-dark-tremor-background dark:shadow-dark-tremor-card dark:ring-dark-tremor-ring">
      <TabGroup
        className="mb-5 px-1"
        onIndexChange={(idx) => setTimeInterval(TimeInterval[idx])}
      >
        <TabList className="flex justify-around" variant="solid" color="sky">
          {TimeInterval.map((interval) => {
            return (
              <Tab
                value={interval}
                key={interval}
                className="aria-selected:font-bold"
              >
                {interval.toUpperCase()}
              </Tab>
            );
          })}
        </TabList>
      </TabGroup>

      <div className="relative h-[20rem] w-full">
        <AreaChart
          data={chartData}
          index="date"
          categories={['close']}
          colors={[increasing ? 'green' : 'red']}
          connectNulls={true}
          showLegend={false}
          autoMinValue={true}
          noDataText="Loading Data ... 🔄"
          valueFormatter={valueFormatter}
          customTooltip={customToolTip}
          showAnimation={!isMobileView()}
          animationDuration={2000}
          yAxisWidth={determineYAxisWidth(
            chartData.slice(timeInterval === '1d' ? 0 : -1)[0]?.close,
          )}
          className="absolute z-10"
        />
        <BarChart
          data={chartData}
          index="date"
          categories={['volume']}
          colors={[increasing ? 'green-300' : 'red-300']}
          showLegend={false}
          noDataText="Loading Data ... 🔄"
          yAxisWidth={determineYAxisWidth(
            chartData.slice(timeInterval === '1d' ? 0 : -1)[0]?.close,
          )}
          showAnimation={!isMobileView()}
          animationDuration={2000}
          valueFormatter={() => ''}
          rotateLabelX={{ angle: 0, verticalShift: 1000000 }}
          showGridLines={false}
          autoMinValue
          maxValue={maxVolume * 4}
          className="absolute z-0"
        />
      </div>
    </div>
  );
}
