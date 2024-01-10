import { ModeToggle } from '@/components/mode-toggle';
import { SearchBar } from '@/components/search-bar';
import { UserAvatar } from '@/components/user-avatar';


import Link from 'next/link';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 w-full bg-[hsl(var(--background))]">
        <div className="container flex flex-row items-center justify-between pt-4">
          <div>
            <Link key="home" href="/dashboard">
              <h2 className="text-3xl font-extrabold tracking-normal">
                Plutus Logo/
              </h2>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <SearchBar placeholder="Search Stock Symbols" />
            <nav className="flex items-center gap-2">
              <ModeToggle />
              <UserAvatar/>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
