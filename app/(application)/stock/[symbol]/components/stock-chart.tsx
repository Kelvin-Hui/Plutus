'use client';
import { getChartData, getQuote } from '@/data/stock';
import { cn, currencyFormat, numberFormat, padChartData } from '@/lib/utils';
import { TimeInterval } from '@/types';
import {
  AreaChart,
  BarChart,
  Card,
  Tab,
  TabGroup,
  TabList,
} from '@tremor/react';
import { useEffect, useState } from 'react';

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
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let [quote, chartData] = await Promise.all([
        getQuote(symbol),
        getChartData(symbol, timeInterval),
      ]);

      const { marketState } = quote;

      const isRegularMarket = marketState === 'REGULAR';
      const is1dInterval = timeInterval === '1d';
      if (!chartData) return null;

      if (isRegularMarket && is1dInterval) {
        chartData = padChartData(chartData);
      }
      chartData = chartData.map((entry: any) => {
        return {
          ...entry,
          date: is1dInterval
            ? entry.date.toLocaleTimeString()
            : entry.date.toLocaleString(),
        };
      });

      // const localeChartData = chartData.map((data:any) => {return {...data, date : is1dInterval? data.date.toLocaleTimeString() :  data.date.toLocaleString()}})

      setMaxVolume(
        Math.max(...chartData.map((data: any) => Number(data.volume))),
      );
      setChartData(chartData);
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
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown">
        {payload.map((category: any, idx: number) => {
          const color = category.color;
          const { date: dateStr } = category.payload;
          const fields = ['open', 'high', 'low', 'close', 'volume'];

          const date = new Date(dateStr);
          const isMidNight = [4, 5].includes(date.getUTCHours());

          return (
            <div key={idx} className="flex flex-1 flex-col">
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
    <>
      <Card className="flex flex-col items-center">
        <TabGroup
          className="mb-5 w-full"
          onIndexChange={(idx) => setTimeInterval(TimeInterval[idx])}
        >
          <TabList
            className="flex w-full justify-around"
            variant="solid"
            color="sky"
          >
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
            showAnimation
            animationDuration={500}
            yAxisWidth={75}
            className="absolute z-10"
          />
          <BarChart
            data={chartData}
            index="date"
            categories={['volume']}
            colors={[increasing ? 'green-300' : 'red-300']}
            showLegend={false}
            noDataText="Loading Data ... 🔄"
            yAxisWidth={75}
            showAnimation
            animationDuration={500}
            valueFormatter={() => ''}
            rotateLabelX={{ angle: 0, verticalShift: 1000000 }}
            showGridLines={false}
            autoMinValue
            maxValue={maxVolume * 4}
            className="tremor-label absolute z-0"
          />
        </div>
      </Card>
    </>
  );
}
