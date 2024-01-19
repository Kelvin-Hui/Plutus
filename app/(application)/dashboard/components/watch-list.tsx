'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useInView } from "react-intersection-observer";

import { getChartData, getQuotes } from '@/data/stock';
import { getWatchListSymbols } from '@/data/user';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { WatchListItem } from './watch-list-item';

export function WatchList() {
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [cursor, setCursor] = useState<any>(undefined);
  const [ref, inView] = useInView()


  const fetchSymbols = async () =>{
    const queries  = await getWatchListSymbols(cursor, symbolList.length === 0? 8 : 4);

    if(isEndOfList) return

    if(queries.count === symbolList.length + queries.data.length){
      setIsEndOfList(true);
    } 
    const symbols = queries.data.map((entry) => entry.symbol);
  
    await getQuotes(symbols);
    symbols.forEach(async (symbol) => await getChartData(symbol, '1d'));

    const lastQuery = queries.data.slice(-1)[0];
    setCursor({userId: lastQuery.userId, symbol : lastQuery.symbol});
    setSymbolList((prev) => [...prev, ...symbols].filter((v,i,self) => self.indexOf(v) === i))
  }

  useEffect(() => {
    if(inView && !isEndOfList) fetchSymbols().catch(console.error)
    
  },[inView])

  return (
    <Card className="h-auto w-full overflow-auto lg:w-1/2">
      <CardHeader className={cn('sticky top-0 z-10')}>
        <CardTitle>Your Watch List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {symbolList.map((symbol,idx) => {
          return(
            <WatchListItem key={symbol+""+idx} symbol={symbol} />
          )
        })}
        {symbolList.length === 0 && (
          <span className="self-center text-muted-foreground">Empty List.</span>
        )}
        <span className={cn('mx-auto flex items-center', {'hidden': isEndOfList})}>Fetching data...  <ArrowPathIcon ref={ref} className='h-4 w-4 animate-spin'></ArrowPathIcon></span>
      </CardContent>
    </Card>
  );
}
