'use client';
import { getAutoComplete } from '@/app/lib/data';
import { AutoCompleteSymbols } from '@/app/lib/definitions';
import { useDebouncedCallback } from '@/app/lib/utils';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react';

export function SearchBar({ placeholder }: { placeholder: string }) {
  const [symbols, setSymbols] = React.useState<AutoCompleteSymbols[]>([]);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const { push } = useRouter();

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (term !== '') {
      const result = await getAutoComplete(term.toUpperCase());
      setSymbols(result);
      setOpenMenu(true);
    } else {
      setSymbols([]);
      setOpenMenu(false);
    }
  }, 300);

  return (
    <>
      <Popover open={openMenu} onOpenChange={setOpenMenu}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            {/* <Input
              className="w-full pl-8"
              placeholder={placeholder}
              onChange={(e) => handleSearch(e.target.value)}
            /> */}
            <Input
              className="w-full pl-8"
              placeholder={placeholder}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>

        {symbols.length > 0 && (
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandList className="p-2">
                {symbols.map(({ symbol, name }, index) => {
                  return (
                    <CommandItem
                      key={symbol + '_' + index}
                      className="ml-2 mr-2"
                      onSelect={() => {
                        setOpenMenu(false);
                        push(`/stock/${symbol}`);
                      }}
                    >
                      {symbol} - {name}
                    </CommandItem>
                  );
                })}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
}
