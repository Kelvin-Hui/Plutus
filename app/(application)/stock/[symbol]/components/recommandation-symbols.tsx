import { getRecommandationSymbols } from '@/app/lib/data';
import { cn } from '@/app/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BadgeDelta } from '@tremor/react';
import Link from 'next/link';

export async function RecommendationSymbols({ symbol }: { symbol: string }) {
  const result = await getRecommandationSymbols(symbol);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        {result.map((quote) => {
          let {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChangePercent,
          } = quote;
          regularMarketChangePercent = regularMarketChangePercent ?? 0;

          return (
            <Link key={symbol} href={`/stock/${symbol}`} className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>{symbol}</CardTitle>
                  <CardDescription className="text-ellipsis whitespace-nowrap">
                    {shortName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-between">
                  <h2
                    className={cn('text-xl text-green-600', {
                      'text-red-600': regularMarketChangePercent <= 0,
                    })}
                  >
                    ${regularMarketPrice}
                  </h2>
                  <BadgeDelta
                    deltaType={
                      regularMarketChangePercent <= 0
                        ? 'moderateDecrease'
                        : 'moderateIncrease'
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
    </>
  );
}
