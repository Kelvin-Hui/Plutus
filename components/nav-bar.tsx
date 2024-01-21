import { MobileNav } from './mobile-nav-drawer';
import { ModeToggle } from './mode-toggle';
import { SearchBar } from './search-bar';
import { UserAvatar } from './user-avatar';
import { WebNav } from './web-nav';

export function NavBar({
  showUserRelated = true,
}: {
  showUserRelated?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex flex-row items-center justify-between pt-4 sm:container">
        <WebNav showNavLinks={showUserRelated} />
        <MobileNav />

        <div className="flex items-center justify-end gap-1">
          <SearchBar placeholder="Search Symbols..." />
          <nav className="flex gap-1">
            <ModeToggle />
            <UserAvatar showUserRelated={showUserRelated} />
          </nav>
        </div>
      </nav>
    </header>
  );
}
