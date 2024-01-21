import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRecommendationQuotes } from '@/data/stock';
import { cn, currencyFormat, percentageFormat } from '@/lib/utils';
import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import Link from 'next/link';

export async function RecommendationSymbols({ symbol }: { symbol: string }) {
  const result = await getRecommendationQuotes(symbol);

  return (
    <>
      <Card className="mx-0.5 border-0">
        <CardHeader>
          <CardTitle>Similar Stocks</CardTitle>
        </CardHeader>
        <CardContent className={cn('overflow-x-auto p-0')}>
          <div className="flex items-center gap-4">
            {result.map((quote) => {
              const {
                symbol,
                shortName,
                regularMarketPrice,
                regularMarketChangePercent,
                regularMarketChange,
                displayName,
              } = quote;

              const increasing = (regularMarketChangePercent ?? 0) >= 0;

              return (
                <Link key={symbol} href={`/stock/${symbol}`} className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>{symbol}</CardTitle>
                      <CardDescription className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {shortName}
                      </CardDescription>
                    </CardHeader>

                    <CardContent
                      className={cn(
                        'flex items-end justify-between gap-x-1 text-sm text-green-600',
                        { 'text-red-600': !increasing },
                      )}
                    >
                      <h2>{currencyFormat(regularMarketPrice)}</h2>
                      <span>
                        {increasing && '+'}
                        {currencyFormat(regularMarketChange)}
                      </span>
                      <BadgeDelta
                        deltaType={
                          increasing ? 'moderateIncrease' : 'moderateDecrease'
                        }
                      >
                        {percentageFormat(regularMarketChangePercent)}
                      </BadgeDelta>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
