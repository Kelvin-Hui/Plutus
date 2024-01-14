import { BalanceChart } from '@/app/(application)/dashboard/components/balance-chart';
import { WatchList } from '@/app/(application)/dashboard/components/watch-list';
import { Metadata } from 'next/types';
import { ProfolioInfo } from './components/profolio-info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <div className="container mt-10 grid h-full grid-cols-3 gap-4">
      {/* <div className="col-span-2 flex flex-col gap-4 flex-1">
        <BalanceChart />
        <ProfolioInfo />
      </div>

      <div className="col-span-2 flex flex-row gap-4 flex-initial h-1/2">
        <WatchList />
        <TrendingSymbols />
      </div> */}

      <div className="col-span-2 flex flex-1">
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
