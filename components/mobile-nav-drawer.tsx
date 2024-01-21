'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navLinks } from '@/config/nav';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { NavLink } from './nav-link';
import { PlutusLogo } from './plutus-logo';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'}>
          <Bars3Icon className="flex h-8 w-8 sm:hidden" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-[200px]">
        <SheetHeader>
          <SheetTitle>
            <PlutusLogo />
          </SheetTitle>
          <SheetDescription>Trading Simulator💵</SheetDescription>
        </SheetHeader>

        <ul className="mt-4 flex flex-col gap-4 pl-2">
          {navLinks.map((navItem) => {
            return (
              <NavLink key={'mobile_link_' + navItem.title} navItem={navItem} />
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
