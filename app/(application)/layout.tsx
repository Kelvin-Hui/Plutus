import { ModeToggle } from '@/components/ModeToggle';
import { SearchBar } from '@/components/SearchBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
