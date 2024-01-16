import { QuoteHeader } from '@/app/(application)/stock/[symbol]/components/quote-header';
import { auth } from '@/auth';
import { KeyStats } from './components/key-stats';
import { NewsTable } from './components/news-table';
import { OrderPanel } from './components/order-panel';
import { RecommendationSymbols } from './components/recommandation-symbols';
import { StockChart } from './components/stock-chart';
import { TranscationHistory } from './components/transcation-history';

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}) {
  return {
    title: decodeURI(params.symbol),
  };
}

export default async function Page({ params }: { params: { symbol: string } }) {
  const symbol = decodeURI(params.symbol);
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div className="item-center container mt-20 flex h-full flex-col gap-10">
      <QuoteHeader symbol={symbol} userId={userId} />
      <div className="space-y-2 lg:flex lg:w-full lg:flex-1 lg:justify-between lg:space-x-2 lg:space-y-0">
        <StockChart symbol={symbol} />
        <OrderPanel symbol={symbol} userId={userId} />
      </div>
      <KeyStats symbol={symbol} />
      <RecommendationSymbols symbol={symbol} />
      <div className="h-3/5 space-y-4 pb-4 lg:flex lg:flex-initial lg:gap-4 lg:space-y-0">
        <NewsTable symbol={symbol} />
        <TranscationHistory symbol={symbol} />
      </div>
    </div>
  );
}
