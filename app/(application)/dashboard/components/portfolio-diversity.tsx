'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, currencyFormat } from '@/lib/utils';
import { PortfolioOverviewData } from '@/types';
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
  marketValue: number;
  color?: string;
  quantity: number;
  marketPrice?: number;
  cost?: number;
} | null;

const LegendItem = ({
  selectValue,
  totalValue,
}: {
  selectValue: SelectValueProps;
  totalValue: number;
}) => {
  if (!selectValue) return null;
  const { symbol, marketValue, color, quantity, marketPrice, cost } =
    selectValue;

  const isCash = symbol === '$CASH';
  const percentage = ((marketValue / totalValue) * 100).toFixed(2);

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
              <span>{symbol}</span>
            ) : (
              <a href={`/stock/${symbol}`}>{symbol}</a>
            )}
            <span className="font-normal">- {percentage}%</span>
          </label>
        </CardTitle>
        {marketPrice && (
          <p className="flex flex-col text-sm sm:text-lg">
            <span>
              Position <b>{currencyFormat(cost)}</b> @ <b>{quantity}</b>
            </span>
            <span>
              Market Price <b>{currencyFormat(marketPrice)}</b>
            </span>
          </p>
        )}
      </CardHeader>
      <CardContent className="text-center text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
        {currencyFormat(marketValue)}
      </CardContent>
    </Card>
  );
};

export function PortfolioDiversity({
  portfolio,
  buyingPower,
}: {
  portfolio: PortfolioOverviewData[];
  buyingPower: number;
}) {
  const [value, setValue] = useState<SelectValueProps>(null);
  const data = portfolio.map((row) => {
    return { ...row, marketValue: row.quantity * row.marketPrice };
  });

  const totalValue =
    data.reduce((acc, quote) => (acc += quote.marketValue), 0) + buyingPower;

  return (
    <div className="flex flex-col items-center justify-around space-y-4 md:flex-row">
      <DonutChart
        data={[
          ...data,
          { symbol: '$CASH', marketValue: buyingPower, quantity: 1 },
        ]}
        category="marketValue"
        index="symbol"
        className="h-64 w-64 sm:h-72 sm:w-72 lg:h-96 lg:w-96"
        colors={colors}
        onValueChange={(v) => {
          setValue(v);
        }}
        valueFormatter={currencyFormat}
      />

      <LegendItem selectValue={value} totalValue={totalValue} />
    </div>
  );
}
