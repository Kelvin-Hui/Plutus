import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRecommandationQuotes } from '@/data/stock';
import { cn } from '@/lib/utils';
import { BadgeDelta } from '@tremor/react';
import Link from 'next/link';

export async function RecommendationSymbols({ symbol }: { symbol: string }) {
  const result = await getRecommandationQuotes(symbol);

  return (
    <>
      <Card className="border-0">
        <CardHeader>
          <CardTitle>Similar Stocks</CardTitle>
        </CardHeader>
        <CardContent className={cn('overflow-x-auto p-0')}>
          <div className="flex w-full items-center justify-between gap-4">
            {result.map((quote) => {
              const {
                symbol,
                shortName,
                regularMarketPrice,
                regularMarketChangePercent,
                regularMarketChange,
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

                    <CardContent className="flex items-center justify-between">
                      <h2
                        className={cn('text-green-600', {
                          'text-red-600': !increasing,
                        })}
                      >
                        ${regularMarketPrice}
                      </h2>
                      <span
                        className={cn('text-sm text-green-600', {
                          'text-red-600': !increasing,
                        })}
                      >
                        {increasing && '+'}
                        {regularMarketChange?.toFixed(2)}
                      </span>
                      <BadgeDelta
                        deltaType={
                          increasing ? 'moderateIncrease' : 'moderateDecrease'
                        }
                      >
                        {regularMarketChangePercent?.toFixed(2)} %{' '}
                      </BadgeDelta>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* <h3 className="self-start pl-6 text-2xl font-semibold leading-none tracking-tight">
        Similar Stocks
      </h3>
      <div className="flex w-full items-center justify-between gap-4">
        {result.map((quote) => {
          const {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChangePercent,
            regularMarketChange
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

                <CardContent className="flex justify-between items-center">
                  <h2
                    className={cn('text-green-600', {
                      'text-red-600': !increasing,
                    })}
                  >
                    ${regularMarketPrice}
                  </h2>
                  <span className={cn('text-green-600 text-sm' , {'text-red-600' : !increasing})}>
                    {increasing && '+'}
                    {regularMarketChange?.toFixed(2)}
                  </span>
                  <BadgeDelta
                    deltaType={
                      increasing ? 'moderateIncrease' : 'moderateDecrease'
                    }
                  >
                    {regularMarketChangePercent?.toFixed(2)} %{' '}
                  </BadgeDelta>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div> */}
    </>
  );
}
