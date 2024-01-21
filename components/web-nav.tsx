import { navLinks } from '@/config/nav';
import { NavLink } from './nav-link';
import { PlutusLogo } from './plutus-logo';

interface WebNavProps {
  showNavLinks: boolean;
}

export function WebNav({ showNavLinks }: WebNavProps) {
  return (
    <nav className="hidden items-center space-x-4 sm:flex">
      <PlutusLogo />
      {showNavLinks &&
        navLinks.map((navItem) => {
          return (
            <NavLink key={'web_link_' + navItem.title} navItem={navItem} />
          );
        })}
    </nav>
  );
}
