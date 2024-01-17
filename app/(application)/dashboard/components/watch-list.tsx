import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChartData, getQuote } from '@/data/stock';
import { getWatchListSymbols } from '@/data/user';
import { cn } from '@/lib/utils';
import { AreaChart, BadgeDelta } from '@tremor/react';
import Link from 'next/link';

export async function WatchListItem({ symbol }: { symbol: string }) {
  const [quote, chartData] = await Promise.all([
    getQuote(symbol),
    getChartData(symbol, '1d'),
  ]);

  const { shortName, regularMarketPrice, regularMarketChangePercent } = quote;

  const increasing = (regularMarketChangePercent ?? 0) >= 0;

  return (
    <div className="grid grid-cols-3 hover:bg-muted/50">
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
        className="w-30 h-10 self-center lg:w-20"
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

  return (
    <Card className="h-auto w-full overflow-auto lg:w-1/2">
      <CardHeader className={cn('sticky top-0 z-10')}>
        <CardTitle>Your Watch List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {symbolList.map((symbol) => {
          return <WatchListItem key={'WatchList_' + symbol} symbol={symbol} />;
        })}
        {symbolList.length === 0 && (
          <span className="self-center text-muted-foreground">Empty List.</span>
        )}
      </CardContent>
    </Card>
  );
}
