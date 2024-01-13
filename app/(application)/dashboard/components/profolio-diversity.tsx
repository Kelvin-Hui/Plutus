'use client';

import { currencyFormat } from '@/lib/utils';
import { ProfolioOverviewData } from '@/types';
import { DonutChart, Flex, Legend } from '@tremor/react';
import { useRouter } from 'next/navigation';
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

export function ProfolioDiversity({
  profolio,
  buyingPower,
}: {
  profolio: ProfolioOverviewData[];
  buyingPower: number;
}) {
  const [value, setValue] = useState({});
  const { push } = useRouter();

  const data = profolio.map((row) => {
    return { ...row, marketValue: row.quantity * row.marketPrice };
  });

  return (
    <Flex alignItems="center">
      <DonutChart
        data={[...data, { symbol: '$CASH', marketValue: buyingPower }]}
        category="marketValue"
        index="symbol"
        // variant="pie"
        // showLabel={false}
        className="h-[24rem] w-[24rem]"
        colors={colors}
        onValueChange={(v) => setValue(v)}
        valueFormatter={currencyFormat}
      />

      <Legend
        categories={data.map((stock) => stock.symbol)}
        colors={colors}
        enableLegendSlider={true}
        className="w-2/3"
        onClickLegendItem={(symbol) => push(`/stock/${symbol}`)}
      />
    </Flex>
  );
}
