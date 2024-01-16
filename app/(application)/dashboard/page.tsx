import { BalanceChart } from '@/app/(application)/dashboard/components/balance-chart';
import { WatchList } from '@/app/(application)/dashboard/components/watch-list';
import { Metadata } from 'next/types';
import { ProfolioInfo } from './components/profolio-info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <div className="container mt-10 flex h-full flex-col gap-4 xl:grid xl:grid-cols-3">
      <div className="col-span-2 flex flex-grow-0">
        <BalanceChart />
      </div>
      <div className="col-span-1 flex flex-grow-0">
        <WatchList />
      </div>
      <div className="col-span-3 pb-4">
        <ProfolioInfo />
      </div>
    </div>
  );
}
