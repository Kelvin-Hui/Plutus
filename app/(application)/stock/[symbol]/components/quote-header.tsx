import { createWatchListItem, deleteWatchListItem } from '@/action/watchList';
import { Button } from '@/components/ui/button';
import { getQuote } from '@/data/stock';
import { getWatchListSymbols } from '@/data/user';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { BadgeDelta } from '@tremor/react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export async function WatchListButton({
  symbol,
  userId,
}: {
  symbol: string;
  userId: string | undefined;
}) {
  if (!userId) return;

  const watchList = await getWatchListSymbols();
  const alreadyWatching = watchList.includes(symbol);

  return (
    <form
      action={async () => {
        'use server';
        alreadyWatching
          ? deleteWatchListItem(symbol, userId)
          : createWatchListItem(symbol, userId);
        revalidatePath(`/stock/${symbol}`);
      }}
    >
      {alreadyWatching ? (
        <Button variant="outline" type="submit">
          Remove From Watch List <EyeSlashIcon className="ml-1 h-6 w-6" />
        </Button>
      ) : (
        <Button variant="outline" type="submit">
          Add To Watch List <EyeIcon className="ml-1 h-6 w-6" />
        </Button>
      )}
    </form>
  );
}

export async function QuoteHeader({
  symbol,
  userId,
}: {
  symbol: string;
  userId: string | undefined;
}) {
  const quote = await getQuote(symbol);

  if (quote === undefined) {
    notFound();
  }

  const companyName = quote.shortName;
  const exchangeName = quote.fullExchangeName;
  const price = quote.regularMarketPrice;
  const percentChange = quote?.regularMarketChangePercent ?? 0;

  const increasing = (quote?.regularMarketChangePercent ?? 0) >= 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h2 className="text-5xl">
          {symbol} - {companyName}
        </h2>
        <span className="text-muted-foreground">
          {exchangeName}-{quote.quoteType}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex flex-row items-center gap-2">
          <h1
            className={cn('text-5xl text-green-600', {
              'text-red-600': !increasing,
            })}
          >
            ${price}
          </h1>
          <BadgeDelta
            deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
            size={'xl'}
          >
            {percentChange?.toFixed(2)} %{' '}
          </BadgeDelta>
        </div>
        <WatchListButton symbol={symbol} userId={userId} />
      </div>
    </div>
  );
}
