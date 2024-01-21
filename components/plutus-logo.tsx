import ArrowTrendingUpIcon from '@heroicons/react/24/outline/ArrowTrendingUpIcon';
import Link from 'next/link';

export function PlutusLogo() {
  return (
    <Link key="home" href="/">
      <div className="flex items-center hover:text-foreground/50">
        <ArrowTrendingUpIcon className="h-8 w-8 text-green-400" />
        <span className="text-2xl font-extrabold tracking-normal">Plutus</span>
      </div>
    </Link>
  );
}
