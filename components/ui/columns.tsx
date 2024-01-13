'use client';

import { Button } from '@/components/ui/button';
import { cn, currencyFormat } from '@/lib/utils';
import { PNLData, TranscationData } from '@/types';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import { BadgeDelta, ProgressCircle } from '@tremor/react';

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
    accessorKey: 'diversityPercentage',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {' '}
          Profolio Diversity <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
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
  {
    accessorKey: 'pnl',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          PNL <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
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
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ROI <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
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
];

export const transcationColumns: ColumnDef<TranscationData>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt');
      return <div>{date.toLocaleString()}</div>;
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
    header: () => {
      return <p className="text-end">Total Cost</p>;
    },
    cell: ({ row }) => {
      const totalCost =
        row.getValue<number>('quantity') * row.getValue<number>('cost');
      return (
        <p
          className={cn('text-end text-green-600', {
            'text-red-600': totalCost > 0,
          })}
        >
          {currencyFormat(-totalCost)}
        </p>
      );
    },
  },
];
