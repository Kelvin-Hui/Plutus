'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, currencyFormat } from '@/lib/utils';
import { ProfolioOverviewData } from '@/types';
import { DonutChart } from '@tremor/react';
import { useState } from 'react';

const colors = [
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

type SelectValueProps = {
  symbol?: string;
  marketValue?: number;
  color?: string;
  quantity?: number;
  marketPrice?: number;
  cost?: number;
} | null;

const LegendItem = ({ selectValue }: { selectValue: SelectValueProps }) => {
  if (!selectValue) return null;
  const { symbol, marketValue, color, quantity, marketPrice, cost } =
    selectValue;

  const isCash = symbol === '$CASH';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <label className="flex items-center space-x-2">
            <span
              className={cn(
                'h-3 w-3 shrink-0 rounded-tremor-full border-2',
                `bg-${color}-500`,
                'border-tremor-background shadow-tremor-card',
                'dark:border-dark-tremor-background dark:shadow-dark-tremor-card',
              )}
            ></span>
            {isCash ? (
              <p>{symbol}</p>
            ) : (
              <a href={`/stock/${symbol}`}>{symbol}</a>
            )}
          </label>
        </CardTitle>
        {marketPrice && (
          <pre className="flex flex-col">
            <span>
              Positon {currencyFormat(cost)} @{quantity}
            </span>
            <span>Market Price {currencyFormat(marketPrice)}</span>
          </pre>
        )}
      </CardHeader>
      <CardContent className="text-2xl font-light">
        {currencyFormat(marketValue)}
      </CardContent>
    </Card>
  );
};

export function ProfolioDiversity({
  profolio,
  buyingPower,
}: {
  profolio: ProfolioOverviewData[];
  buyingPower: number;
}) {
  const [value, setValue] = useState<SelectValueProps>(null);
  const data = profolio.map((row) => {
    return { ...row, marketValue: row.quantity * row.marketPrice };
  });

  return (
    <div className="flex items-center justify-around">
      <DonutChart
        data={[...data, { symbol: '$CASH', marketValue: buyingPower }]}
        category="marketValue"
        index="symbol"
        className="h-[24rem] w-[24rem]"
        colors={colors}
        onValueChange={(v) => {
          setValue(v);
        }}
        valueFormatter={currencyFormat}
      />

      <LegendItem selectValue={value} />
    </div>
  );
}
