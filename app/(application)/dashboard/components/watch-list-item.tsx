import { getChartData, getQuotes } from "@/data/stock";
import { cn, padChartData } from "@/lib/utils";
import { AreaChart, BadgeDelta } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export function WatchListItem({ symbol}: { symbol: string }) {

    const [quote, setQoute] = useState<any>({});
    const [chartData, setChartData] = useState<any[]>([]);
    const router = useRouter();


    useEffect(()=>{
       const fetchData = async () => {
            const [quote, chartData] = await Promise.all([
                getQuotes(symbol),
                getChartData(symbol, '1d'),
            ]);
            setQoute(quote);
            setChartData(chartData);
       }
       fetchData().catch(console.error)
    },[])
    
    if(chartData.length === 0) return null;

    const { shortName, regularMarketPrice, regularMarketChangePercent } = quote;
  
    const increasing = (regularMarketChangePercent ?? 0) >= 0;
  
    return (
      <div className="grid grid-cols-3 hover:bg-muted/50">
        <div className="flex flex-col hover:cursor-pointer"  onClick={() => router.push(`/stock/${symbol}`)} >
          {/* <Link href={`/stock/${symbol}`} className="font-semibold"> */}
            {symbol}
          {/* </Link> */}
          <span className="text-sm text-muted-foreground">{shortName}</span>
        </div>
  
        <AreaChart
          data={padChartData(chartData)}
          index="date"
          categories={['close']}
          colors={[increasing ? 'green' : 'red']}
          connectNulls={true}
          showLegend={false}
          autoMinValue={true}
          showXAxis={false}
          showYAxis={false}
          showTooltip={false}
          className="w-30 h-10 self-center lg:w-20"
        />
        <div className="flex items-center justify-self-end">
          <h1 className={cn('text-green-600', { 'text-red-600': !increasing })}>
            ${regularMarketPrice?.toFixed(2)}
          </h1>
          <BadgeDelta
            deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
          >
            {regularMarketChangePercent?.toFixed(2)}%
          </BadgeDelta>
        </div>
      </div>
    );
  }