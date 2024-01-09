'use client';

import { PNLData, TranscationData } from '@/app/lib/definitions';
import { ColumnDef } from '@tanstack/react-table';

export const pnlColumns: ColumnDef<PNLData>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'shares',
    header: 'Shares',
  },
  {
    accessorKey: 'averageCost',
    header: 'Average Cost',
  },
  {
    accessorKey: 'pnl',
    header: 'PNL',
  },
  {
    accessorKey: 'diversity',
    header: 'Diversity',
  },
];

export const transcationColumns: ColumnDef<TranscationData>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (row) => {
      const date = row.getValue<Date>();
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'shares',
    header: 'Shares',
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
  },
  {
    accessorKey: 'totalCost',
    header: 'Total Cost',
    cell: ({ row }) => {
      return <div>{row.original.shares * row.original.cost}</div>;
    },
  },
];
