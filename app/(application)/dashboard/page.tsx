import { BalanceChart } from '@/app/(application)/dashboard/components/balance-chart';
import { WatchList } from '@/app/(application)/dashboard/components/watch-list';
import { cn } from '@/lib/utils';
import { Metadata } from 'next/types';
import { PortfolioInfo } from './components/portfolio-info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <div className="container mt-10 flex h-full flex-col gap-10">
      <div
        className={cn(
          'space-y-2',
          'lg:flex lg:h-[35rem] lg:flex-initial lg:space-x-2 lg:space-y-0',
        )}
      >
        <BalanceChart />
        <WatchList />
      </div>
      <PortfolioInfo />
    </div>
  );
}
