import { getQuote } from '@/app/lib/data';
import { cn } from '@/app/lib/utils';
import { BadgeDelta } from '@tremor/react';
import { notFound } from 'next/navigation';

export async function QuoteHeader({ symbol }: { symbol: string }) {
  const quote = await getQuote(symbol);

  if (quote === undefined) {
    notFound();
  }

  const companyName = quote.shortName;
  const exchangeName = quote.fullExchangeName;
  const price = quote.regularMarketPrice;
  const percentChange = quote?.regularMarketChangePercent ?? 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h2 className="text-5xl">
          {symbol} - {companyName}
        </h2>
        <span className="text-muted-foreground">{exchangeName}</span>
      </div>
      <div className="flex flex-row gap-2">
        <h1
          className={cn('text-4xl text-green-600', {
            'text-red-600': percentChange <= 0,
          })}
        >
          {' '}
          ${price}
        </h1>
        <BadgeDelta
          deltaType={
            percentChange <= 0 ? 'moderateDecrease' : 'moderateIncrease'
          }
          size={'xl'}
        >
          {percentChange?.toFixed(2)} %{' '}
        </BadgeDelta>
      </div>
    </div>
  );
}
