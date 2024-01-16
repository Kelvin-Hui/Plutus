import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { SearchBar } from './search-bar';
import { UserAvatar } from './user-avatar';

export function NavBar({
  showUserRelated = true,
}: {
  showUserRelated?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background pb-2">
      <nav className="container flex flex-row items-center justify-between pt-4">
        <ul className="flex items-center space-x-4">
          <Link key="home" href="/">
            <div className="items-center text-2xl font-extrabold tracking-normal hover:text-foreground/75 sm:flex">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-300" />
              <span className="hidden sm:flex">Plutus</span>
            </div>
          </Link>
          {showUserRelated && (
            <Link
              href="/dashboard"
              className="text-md text-muted-foreground hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </ul>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SearchBar placeholder="Search Symbols" />
          <nav className="flex items-center gap-2">
            <ModeToggle />
            <UserAvatar showUserRelated={showUserRelated} />
          </nav>
        </div>
      </nav>
    </header>
  );
}
