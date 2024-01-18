import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    regularMarketChange,
  } = quote;

  const increasing = (regularMarketChangePercent ?? 0) >= 0;

  return (
    <div className="grid grid-cols-5 hover:bg-muted/50">
      <div className="flex flex-col">
        <Link href={`/stock/${symbol}`} className="font-semibold">
          {symbol}
        </Link>
        <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {shortName}
        </span>
      </div>
      <div className="flex flex-col items-center text-sm">
        <h1 className="text-muted-foreground underline decoration-dotted underline-offset-2">
          Volume
        </h1>
        <span>{numberFormat(regularMarketVolume)}</span>
      </div>

      <div
        className={cn(
          'col-span-2 space-x-2 self-center justify-self-end text-green-600',
          { 'text-red-600': !increasing },
        )}
      >
        <span>${regularMarketPrice?.toFixed(2)}</span>
        <span className="text-sm">
          {increasing && '+'}
          {regularMarketChange?.toFixed(2)}
        </span>
      </div>
      <BadgeDelta
        deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
        className="self-center justify-self-end"
      >
        {regularMarketChangePercent?.toFixed(2)}%
      </BadgeDelta>
    </div>
  );
}

export async function TrendingSymbols() {
  const trending = await getTrendingSymbols();
  return (
    <Card className="h-full w-full self-center overflow-auto shadow-xl md:w-2/3 md:self-auto">
      <CardHeader className="sticky top-0">
        <CardTitle>🇺🇸 Trending Symbols</CardTitle>
        {/* <CardDescription>{new Date().toString()}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {trending.map((quote: any) => {
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
