'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

import { get1minChartData, getQuotes } from '@/data/stock';
import { getWatchListSymbols } from '@/data/user';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { WatchListItem } from './watch-list-item';

export function WatchList({ userId }: { userId: string }) {
  const [watchListData, setWatchListData] = useState<any[]>([]);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [cursor, setCursor] = useState<any>(undefined);
  const [ref, inView] = useInView({ threshold: 1, initialInView: true });

  const fetchSymbols = async () => {
    setIsFetching(true);

    const queries = await getWatchListSymbols(
      userId,
      cursor,
      watchListData.length === 0 ? 8 : 4,
    );

    if (isEndOfList) return;

    if (queries.count <= watchListData.length + queries.data.length) {
      setIsEndOfList(true);
    }
    const symbols = queries.data.map((entry) => entry.symbol);
    if (symbols.length === 0) return;

    const duplicated = symbols.filter((symbol) =>
      watchListData.map((each) => each.symbol).includes(symbol),
    );
    const [quotes, ...chartDatas] = await Promise.all([
      getQuotes(symbols),
      ...symbols.map((symbol) => get1minChartData(symbol)),
    ]);

    const lastQuery = queries.data.slice(-1)[0];
    setCursor({ userId: lastQuery.userId, symbol: lastQuery.symbol });
    if (duplicated.length == 0)
      setWatchListData((prev) => [
        ...prev,
        ...symbols.map((symbol, idx) => {
          return {
            symbol: symbol,
            quote: quotes[idx],
            chartData: chartDatas[idx],
          };
        }),
      ]);
  };

  useEffect(() => {
    if (isFetching) return;

    if (inView && !isEndOfList) {
      fetchSymbols()
        .catch(console.error)
        .finally(() => setIsFetching(false));
    }
  }, [inView]);

  return (
    <Card className="max-h-[650px] overflow-auto">
      <CardHeader className={cn('sticky top-0 z-10')}>
        <CardTitle>Watch List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {watchListData.map((data, idx) => {
          const { symbol, quote, chartData } = data;
          return (
            <WatchListItem
              key={symbol + '' + idx}
              symbol={symbol}
              quote={quote}
              chartData={chartData}
            />
          );
        })}
        {watchListData.length === 0 && isEndOfList && (
          <span className="mx-auto text-muted-foreground">Empty List</span>
        )}
        <span
          className={cn('mx-auto flex items-center', { hidden: isEndOfList })}
        >
          Fetching data...{' '}
          <ArrowPathIcon
            ref={ref}
            className="h-4 w-4 animate-spin"
          ></ArrowPathIcon>
        </span>
      </CardContent>
    </Card>
  );
}
