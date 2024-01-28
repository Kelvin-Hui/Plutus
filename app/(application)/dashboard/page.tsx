import { BalanceChart } from '@/app/(application)/dashboard/components/balance-chart';
import { WatchList } from '@/app/(application)/dashboard/components/watch-list';
import { getCurrentUserId } from '@/data/user';
import { Metadata } from 'next/types';
import { PortfolioInfo } from './components/portfolio-info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('userId should exists!');

  return (
    <div className="mt-16 flex flex-col gap-y-5 sm:container">
      <div className="space-y-4 lg:grid lg:grid-cols-3 lg:space-x-2 lg:space-y-0">
        <BalanceChart userId={userId} />
        <WatchList userId={userId} />
      </div>
      <PortfolioInfo userId={userId} />
    </div>
  );
}
