'use client';
import { CardFooter } from '@/components/ui/card';
import { getChartData, getQuote } from '@/data/stock';
import { cn, currencyFormat, padChartData } from '@/lib/utils';
import { Interval } from '@/types';
import { AreaChart, Card, Tab, TabGroup, TabList } from '@tremor/react';
import { useEffect, useState } from 'react';

export function StockChart({ symbol }: { symbol: string }) {
  const Intervals: Interval[] = ['1m', '5m', '30m', '1h', '1d', '1wk', '1mo'];

  const [interval, setInterval] = useState<Interval>('1m');
  const [increasing, setIncreasing] = useState<boolean>(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [quote, chartData] = await Promise.all([
        getQuote(symbol),
        getChartData(symbol, interval),
      ]);
      const isRegularMarket = quote.marketState === 'REGULAR';
      setChartData(
        isRegularMarket && interval == '1m'
          ? padChartData(chartData)
          : chartData,
      );
      setIncreasing((quote?.regularMarketChangePercent ?? 0) >= 0);
    };

    fetchData().catch(console.error);
  }, [interval, symbol]);

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
          const { date } = category.payload;
          const fields = ['open', 'high', 'low', 'close'];

          return (
            <div key={idx} className="flex flex-1 flex-col">
              <p className="m-2">{category.payload['date']}</p>
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
                    <p>{valueFormatter(value)}</p>
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
        <AreaChart
          data={chartData}
          index="date"
          categories={['close']}
          colors={[increasing ? 'green' : 'red']}
          connectNulls={true}
          showLegend={false}
          autoMinValue={true}
          noDataText="Loading Data ... 🔄"
          startEndOnly={true}
          valueFormatter={valueFormatter}
          customTooltip={customToolTip}
          showAnimation
          animationDuration={2000}
          yAxisWidth={75}
        />
        <CardFooter className="w-full">
          <TabGroup
            className="mt-5 w-full"
            onIndexChange={(idx) => setInterval(Intervals[idx])}
          >
            <TabList
              className="flex w-full justify-around"
              variant="solid"
              color="sky"
            >
              {Intervals.map((interval) => {
                return (
                  <Tab value={interval} key={interval}>
                    {' '}
                    {interval}
                  </Tab>
                );
              })}
            </TabList>
          </TabGroup>
        </CardFooter>
      </Card>
    </>
  );
}
