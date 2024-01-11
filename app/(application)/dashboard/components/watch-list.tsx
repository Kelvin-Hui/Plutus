import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getChartData, getQuote } from '@/data/stock';
import { getWatchListSymbols } from '@/data/user';
import { cn } from '@/lib/utils';
import { AreaChart, BadgeDelta } from '@tremor/react';
import Link from 'next/link';

export async function WatchListItem({ symbol }: { symbol: string }) {
  const [quote, [chartData, _]] = await Promise.all([
    getQuote(symbol),
    getChartData(symbol, '1m'),
  ]);

  const { shortName, regularMarketPrice, regularMarketChangePercent } = quote;

  const increasing = (regularMarketChangePercent ?? 0) >= 0;

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col">
        <Link href={`/stock/${symbol}`} className="font-semibold">
          {symbol}
        </Link>
        <span className="text-sm text-muted-foreground">{shortName}</span>
      </div>

      <AreaChart
        data={chartData}
        index="date"
        categories={['close']}
        colors={[increasing ? 'green' : 'red']}
        connectNulls={true}
        showLegend={false}
        autoMinValue={true}
        showXAxis={false}
        showYAxis={false}
        showTooltip={false}
        className="h-10 w-20 self-center"
      />
      <div className="flex items-center justify-self-end">
        <h1 className={cn('text-green-600', { 'text-red-600': !increasing })}>
          ${regularMarketPrice?.toFixed(2)}
        </h1>
        <BadgeDelta
          deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
        >
          {regularMarketChangePercent?.toFixed(2)}%
        </BadgeDelta>
      </div>
    </div>
  );
}

export async function WatchList() {
  const symbolList = await getWatchListSymbols();
  // const symbolList = watchList.map((obj) => obj.symbol);

  return (
    <Card className="h-full w-full flex-auto overflow-auto">
      <CardHeader>
        <CardTitle>Your Watch List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {symbolList.map((symbol) => {
          return <WatchListItem key={'WatchList_' + symbol} symbol={symbol} />;
        })}
        {symbolList.length === 0 && (
          <span className="self-center font-bold">Empty List</span>
        )}
      </CardContent>
      <CardFooter>Last Update: {new Date().toLocaleString()}</CardFooter>
    </Card>
  );
}
