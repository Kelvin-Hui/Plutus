import { Separator } from '@/components/ui/separator';
import {
  cn,
  currencyFormat,
  padChartData,
  percentageFormat,
} from '@/lib/utils';
import { Quote } from '@/types';
import AreaChart from '@tremor/react/dist/components/chart-elements/AreaChart/AreaChart';
import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import Link from 'next/link';

export function WatchListItem({
  symbol,
  quote,
  chartData,
}: {
  symbol: string;
  quote: Quote;
  chartData: any[];
}) {
  if (chartData.length === 0) return null;

  const { shortName, regularMarketPrice, regularMarketChangePercent } = quote;

  const increasing = (regularMarketChangePercent ?? 0) >= 0;

  return (
    <>
      <Separator />
      <div className="grid grid-cols-3 items-center hover:bg-muted/50">
        <div className="flex flex-col hover:cursor-pointer">
          <Link href={`/stock/${symbol}`} className="font-semibold">
            {symbol}
          </Link>
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
          className="h-10 self-center "
        />
        <div className="flex flex-col items-center justify-end">
          <h1
            className={cn('text-right text-green-600', {
              'text-red-600': !increasing,
            })}
          >
            {currencyFormat(regularMarketPrice)}
          </h1>
          <BadgeDelta
            deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
          >
            {percentageFormat(regularMarketChangePercent)}
          </BadgeDelta>
        </div>
      </div>
    </>
  );
}
