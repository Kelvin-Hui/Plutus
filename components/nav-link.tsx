import type { NavItem } from '@/config/nav';
import Link from 'next/link';

export function NavLink({ navItem }: { navItem: NavItem }) {
  return (
    <Link
      href={navItem.href}
      className="text-md text-muted-foreground hover:text-primary"
    >
      {navItem.title}
    </Link>
  );
}
