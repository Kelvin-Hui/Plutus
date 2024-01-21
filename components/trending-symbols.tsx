import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTrendingQuotes } from '@/data/stock';
import {
  cn,
  currencyFormat,
  numberFormat,
  percentageFormat,
} from '@/lib/utils';
import { Quote } from '@/types';
import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import Link from 'next/link';
import { Separator } from './ui/separator';

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
    <>
      <Separator />
      <div className="grid grid-cols-3 hover:bg-muted/50">
        <div className="flex flex-col">
          <Link href={`/stock/${symbol}`}>
            <h6 className="font-semibold sm:text-lg">{symbol}</h6>
          </Link>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {shortName}
          </p>
        </div>

        <div className="flex flex-col items-center text-sm sm:text-base">
          <h1 className="text-muted-foreground underline decoration-dotted underline-offset-2">
            Volume
          </h1>
          <h6>{numberFormat(regularMarketVolume)}</h6>
        </div>

        <div
          className={cn('flex flex-col items-center text-green-600', {
            'text-red-600': !increasing,
          })}
        >
          <div>
            <span>{currencyFormat(regularMarketPrice)}</span>
            <span className="pl-1 text-sm">
              {increasing && '+'}
              {currencyFormat(regularMarketChange)}
            </span>
          </div>

          <BadgeDelta
            deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
            className="self-center"
          >
            {percentageFormat(regularMarketChangePercent)}
          </BadgeDelta>
        </div>
      </div>
    </>
  );
}

export async function TrendingSymbols() {
  const trending = await getTrendingQuotes();
  return (
    <Card className="m-2 lg:max-h-[800px] lg:overflow-auto">
      <CardHeader className="sticky top-0">
        <CardTitle>🇺🇸 Trending Symbols</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 [&>*:first-child]:hidden">
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
