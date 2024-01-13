import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components//ui/card';
import { getTrendingSymbols } from '@/data/stock';
import { cn, numberFormat } from '@/lib/utils';
import { Quote } from '@/types';
import { BadgeDelta } from '@tremor/react';
import Link from 'next/link';

export function TrendingSymbolItem({ quote }: { quote: Quote }) {
  const {
    symbol,
    shortName,
    regularMarketPrice,
    regularMarketChangePercent,
    regularMarketVolume,
    averageDailyVolume10Day,
  } = quote;

  const increasing = (regularMarketChangePercent ?? 0) >= 0;

  return (
    <div className="grid grid-cols-3 hover:bg-muted/50">
      <div className="flex flex-col">
        <Link href={`/stock/${symbol}`} className="font-semibold">
          {symbol}
        </Link>
        <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {shortName}
        </span>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col items-center justify-between text-sm">
          <h1 className="text-muted-foreground underline">Volume</h1>
          <h1>{numberFormat(regularMarketVolume)}</h1>
        </div>
      </div>
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

export async function TrendingSymbols() {
  const trending = await getTrendingSymbols();
  return (
    <Card className="h-full w-full flex-auto overflow-auto">
      <CardHeader>
        <CardTitle>🇺🇸 Trending Symbols</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {trending.map((quote) => {
          return (
            <TrendingSymbolItem
              key={'TrendingSymbol_' + quote.symbol}
              quote={quote}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
