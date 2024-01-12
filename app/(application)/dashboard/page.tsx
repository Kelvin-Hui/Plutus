import { BalanceChart } from '@/app/(application)/dashboard/components/balance-chart';
import { WatchList } from '@/app/(application)/dashboard/components/watch-list';
import { Metadata } from 'next/types';
import { ProfolioInfo } from './components/profolio-info';
import { TrendingSymbols } from './components/trending-symbols';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <div className="container mt-20 grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        <BalanceChart />
        <ProfolioInfo />
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <WatchList />
        <TrendingSymbols />
      </div>
    </div>
  );
}
