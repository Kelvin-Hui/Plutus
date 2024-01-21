'use client';

import { Button } from '@/components/ui/button';
import { cn, currencyFormat } from '@/lib/utils';
import { PNLData, TransactionData } from '@/types';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

import BadgeDelta from '@tremor/react/dist/components/icon-elements/BadgeDelta/BadgeDelta';
import ProgressCircle from '@tremor/react/dist/components/vis-elements/ProgressCircle/ProgressCircle';

interface SortableHeaderProps {
  header: string;
  column: any;
}
function SortableHeader({ header, column }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="text-[10px] sm:text-sm"
    >
      {header}
      <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
export const pnlColumns: ColumnDef<PNLData>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    cell: ({ row }) => {
      const symbol = row.getValue<string>('symbol');
      return (
        <a href={`/stock/${symbol}`} className="font-semibold underline">
          {symbol}
        </a>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ' Position',
  },
  {
    accessorKey: 'cost',
    header: 'Average Cost',
    cell: ({ row }) => {
      const cost = row.getValue<number>('cost');
      return <p>{currencyFormat(cost)}</p>;
    },
  },
  {
    accessorKey: 'marketPrice',
    header: 'Market Price',
    cell: ({ row }) => {
      const marketPrice = row.getValue<number>('marketPrice');
      return <p>{currencyFormat(marketPrice)}</p>;
    },
  },
  {
    accessorKey: 'todayReturn',
    header: ({ column }) => {
      return <SortableHeader header="Today's Return" column={column} />;
    },
    cell: ({ row }) => {
      const todayReturn = row.getValue<number>('todayReturn');
      const increasing = todayReturn >= 0;
      return (
        <p
          className={cn('text-center text-green-600', {
            'text-red-600': !increasing,
          })}
        >
          {currencyFormat(todayReturn)}
        </p>
      );
    },
  },
  {
    accessorKey: 'pnl',
    header: ({ column }) => {
      return <SortableHeader header="PNL" column={column} />;
    },
    cell: ({ row }) => {
      const PNL = row.getValue<number>('pnl');
      const increasing = PNL >= 0;
      return (
        <p className={cn('text-green-600', { 'text-red-600': !increasing })}>
          {currencyFormat(PNL)}
        </p>
      );
    },
  },

  {
    accessorKey: 'roi',
    header: ({ column }) => {
      return <SortableHeader header="ROI" column={column} />;
    },
    cell: ({ row }) => {
      const ROI = row.getValue<number>('roi');
      const increasing = ROI >= 0;
      return (
        <BadgeDelta
          deltaType={increasing ? 'moderateIncrease' : 'moderateDecrease'}
        >
          {increasing && '+'}
          {ROI.toFixed(2)}%
        </BadgeDelta>
      );
    },
  },
  {
    accessorKey: 'diversityPercentage',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full"
        >
          Portfolio Diversity <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const diversity = row.getValue<number>('diversityPercentage');

      return (
        <ProgressCircle
          value={diversity}
          size="xs"
          tooltip={`${diversity.toFixed(2)}%`}
        />
      );
    },
  },
];

export const transactionColumns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <SortableHeader header="Date" column={column} />;
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt');
      return <div>{new Date(date).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    cell: ({ row }) => {
      const symbol = row.getValue<string>('symbol');
      return (
        <a href={`/stock/${symbol}`} className="font-semibold underline">
          {symbol}
        </a>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => {
      const cost = row.getValue<number>('cost');
      return <p>{currencyFormat(cost)}</p>;
    },
  },
  {
    accessorKey: 'totalCost',
    header: 'Total Cost',
    // header: () => {
    //   return <p className="text-end">Total Cost</p>;
    // },
    cell: ({ row }) => {
      const totalCost =
        row.getValue<number>('quantity') * row.getValue<number>('cost');
      return (
        <p
          className={cn(' text-green-600', {
            'text-red-600': totalCost > 0,
          })}
        >
          {currencyFormat(-totalCost)}
        </p>
      );
    },
  },
];
