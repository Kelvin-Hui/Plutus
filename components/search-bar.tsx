'use client';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAutoComplete } from '@/data/stock';
import { useDebouncedCallback } from '@/lib/utils';
import { AutoCompleteSymbols } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const SearchSchema = z.object({
    searchValue: z.string(),
  });

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchValue: '',
    },
  });

  return (
    <>
      <Popover open={openMenu} onOpenChange={setOpenMenu}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                <FormField
                  control={form.control}
                  name="searchValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl
                        onChange={(e) =>
                          handleSearch(form.getValues('searchValue'))
                        }
                      >
                        <div className='items-center" relative flex'>
                          <Input
                            placeholder={placeholder}
                            {...field}
                            className="w-full pl-8"
                          />
                          <MagnifyingGlassIcon className="absolute left-2 h-4 w-4 self-center text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </PopoverTrigger>

        {symbols.length > 0 && (
          <PopoverContent
            className="p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandList className="p-2">
                {symbols.map(({ symbol, name, exchange }, index) => {
                  return (
                    <CommandItem
                      key={symbol + '_' + index}
                      className="block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2 text-sm"
                      onSelect={() => {
                        setOpenMenu(false);
                        setSymbols([]);
                        form.reset();
                        push(`/stock/${symbol}`);
                      }}
                    >
                      {name} -{' '}
                      <span className="text-xs text-muted-foreground">
                        {symbol} - {exchange}
                      </span>
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
