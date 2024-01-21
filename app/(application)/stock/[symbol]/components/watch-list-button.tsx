'use client';

import { createWatchListItem, deleteWatchListItem } from '@/action/watchList';
import { Button } from '@/components/ui/button';
import {
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useTransition } from 'react';

export function WatchListButton({
  symbol,
  userId,
  alreadyWatching,
}: {
  symbol: string;
  userId: string | undefined;
  alreadyWatching: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  if (!userId) return;

  function handleOnClick(
    symbol: string,
    userId: string,
    alreadyWatching: boolean,
  ) {
    startTransition(() => {
      alreadyWatching
        ? deleteWatchListItem(symbol, userId)
        : createWatchListItem(symbol, userId);
    });
  }

  return (
    <Button
      variant="outline"
      onClick={() => handleOnClick(symbol, userId, alreadyWatching)}
      disabled={isPending}
    >
      <span className="hidden sm:block">
        {isPending
          ? 'Updating'
          : alreadyWatching
            ? 'Remove From Watch List'
            : 'Add To Watch List'}
      </span>
      <span className="ml-1 h-6 w-6">
        {isPending ? (
          <ArrowPathIcon className="animate-spin" />
        ) : alreadyWatching ? (
          <EyeSlashIcon />
        ) : (
          <EyeIcon className="animate-pulse" />
        )}
      </span>
    </Button>
  );
}
