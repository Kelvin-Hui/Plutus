import { QuoteHeader } from '@/app/(application)/stock/[symbol]/components/quote-header';
import { getCurrentUserId } from '@/data/user';
import { KeyStats } from './components/key-stats';
import { NewsTable } from './components/news-table';
import { OrderPanel } from './components/order-panel';
import { RecommendationSymbols } from './components/recommendation-symbols';
import { StockChart } from './components/stock-chart';
import { TransactionHistory } from './components/transaction-history';

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
  const symbol = decodeURI(params.symbol).toUpperCase();
  const userId = await getCurrentUserId();

  return (
    <div className="mt-16 flex flex-col gap-y-5 sm:container">
      <QuoteHeader symbol={symbol} userId={userId} />
      <div className="md:grid md:grid-cols-3 md:gap-x-2">
        <StockChart symbol={symbol} />
        <OrderPanel symbol={symbol} userId={userId} />
      </div>
      <KeyStats symbol={symbol} />
      <RecommendationSymbols symbol={symbol} />
      <div className="mb-5 flex flex-col gap-5 md:grid md:grid-cols-2">
        <NewsTable symbol={symbol} />
        <TransactionHistory symbol={symbol} userId={userId} />
      </div>
    </div>
  );
}
