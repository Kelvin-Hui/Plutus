import { getQuotes } from '@/data/stock';
import { checkIfWatchItemExists } from '@/data/user';
import { cn } from '@/lib/utils';
import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import { notFound } from 'next/navigation';
import { WatchListButton } from './watch-list-button';

export async function QuoteHeader({
  symbol,
  userId,
}: {
  symbol: string;
  userId: string | undefined;
}) {
  const [quote, alreadyWatching] = await Promise.all([
    getQuotes(symbol),
    checkIfWatchItemExists(symbol),
  ]);
  // const quote = await getQuotes(symbol);
  // const alreadyWatching = await checkIfWatchItemExists(symbol)

  if (quote === undefined) {
    notFound();
  }
  const {
    shortName: companyName,
    fullExchangeName: exchangeName,
    regularMarketPrice: price,
    regularMarketChangePercent: percentChange,
    regularMarketChange: priceChange,
  } = quote;

  const increasing = (percentChange ?? 0) >= 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col space-y-2">
        <h2 className="text-5xl">
          {companyName} -{' '}
          <span className="text-muted-foreground">{symbol}</span>
        </h2>
        <span className="text-muted-foreground">
          {exchangeName}-{quote.quoteType}
        </span>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <div className="flex flex-row items-end gap-2">
          <h1
            className={cn('text-5xl text-green-600', {
              'text-red-600': !increasing,
            })}
          >
            ${price}
          </h1>
          <span
            className={cn('text-2xl text-green-600', {
              'text-red-600': !increasing,
            })}
          >
            {increasing && '+'}
            {priceChange.toFixed(2)}
          </span>
          <BadgeDelta
            deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
            size={'xl'}
          >
            {percentChange?.toFixed(2)}%
          </BadgeDelta>
        </div>
        <WatchListButton
          symbol={symbol}
          userId={userId}
          alreadyWatching={alreadyWatching}
        />
      </div>
    </div>
  );
}
