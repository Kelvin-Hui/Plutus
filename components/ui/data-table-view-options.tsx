'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  colHeaderMap: { [key: string]: string };
}

function getHeaderValue(id: string, colHeaderMap: { [key: string]: string }) {
  return colHeaderMap[id] ?? id;
}

export function DataTableViewOptions<TData>({
  table,
  colHeaderMap,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {getHeaderValue(column.id, colHeaderMap)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}