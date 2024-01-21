import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { cn, currencyFormat, percentageFormat } from '@/lib/utils';
import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import Link from 'next/link';

interface SymbolCardProps {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  regularMarketChange: number;
}

export function SymbolCard({
  symbol,
  shortName,
  regularMarketPrice,
  regularMarketChangePercent,
  regularMarketChange,
}: SymbolCardProps) {
  const increasing = regularMarketChange >= 0;
  return (
    <Link href={`/stock/${symbol}`} aria-hidden>
      <Card className={cn('min-w-[250px]')}>
        <CardHeader>
          <div
            className={cn(
              'flex flex-row items-center justify-between space-x-4',
            )}
          >
            <pre className="leading-tight">{symbol}</pre>
            <BadgeDelta
              deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
              size={'sm'}
            >
              {percentageFormat(regularMarketChangePercent)}
            </BadgeDelta>
          </div>
          <CardDescription
            className={cn(
              'text-md text-default block w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold leading-tight tracking-tight',
            )}
          >
            {shortName}
          </CardDescription>
        </CardHeader>

        <CardContent
          className={cn('flex items-center justify-between text-green-500', {
            'text-red-500': !increasing,
          })}
        >
          <span>{currencyFormat(regularMarketPrice)}</span>
          <span>
            {increasing && '+'}
            {currencyFormat(regularMarketChange)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
