import { getQuotes } from '@/data/stock';
import { checkIfWatchListItemExists } from '@/data/user';
import { cn, currencyFormat, percentageFormat } from '@/lib/utils';
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
    checkIfWatchListItemExists(userId, symbol),
  ]);

  if (quote === undefined) {
    notFound();
  }
  const {
    shortName: companyName,
    fullExchangeName: exchangeName,
    regularMarketPrice: price,
    regularMarketChangePercent: percentChange,
    regularMarketChange: priceChange,
    quoteType: quoteType,
  } = quote;

  const increasing = (percentChange ?? 0) >= 0;

  return (
    <>
      <div className="pl-4">
        <h2 className="text-3xl lg:text-5xl">
          {companyName} -{' '}
          <span className="text-muted-foreground">{symbol}</span>
        </h2>
        <div className="flex items-center justify-between">
          <h2 className="text-base text-muted-foreground">
            {exchangeName} - {quoteType}
          </h2>
          <WatchListButton
            symbol={symbol}
            userId={userId}
            alreadyWatching={alreadyWatching}
          />
        </div>

        <div
          className={cn(
            'flex flex-col items-end text-green-600 sm:flex-row sm:justify-end',
            { 'text-red-600': !increasing },
          )}
        >
          <h1 className="text-5xl font-semibold leading-tight tracking-tight lg:text-7xl">
            {currencyFormat(price)}
          </h1>
          <div className="flex items-center">
            <span className="text-xl lg:text-3xl">
              {increasing && '+'}
              {currencyFormat(priceChange)}
            </span>
            <BadgeDelta
              deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
              size={'lg'}
            >
              {percentageFormat(percentChange)}
            </BadgeDelta>
          </div>
        </div>
      </div>
    </>
  );
}
