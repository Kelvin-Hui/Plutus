'use client';

import { PNLData, TranscationData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const pnlColumns: ColumnDef<PNLData>[] = [
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'cost',
    header: 'Average Cost',
  },
  {
    accessorKey: 'pnl',
    header: 'PNL',
  },
];

export const transcationColumns: ColumnDef<TranscationData>[] = [
  {
    accessorKey: 'createdAt',
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
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
  },
  {
    accessorKey: 'totalCost',
    header: 'Total Cost',
    cell: ({ row }) => {
      const totalCost = (row.original.quantity * row.original.cost).toFixed(2);
      return <div>{totalCost}</div>;
    },
  },
];
