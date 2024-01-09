import { KeyStats } from '@/app/(application)/stock/[symbol]/components/key-stats';
import { NewsTable } from '@/app/(application)/stock/[symbol]/components/news-table';
import { OrderPanel } from '@/app/(application)/stock/[symbol]/components/order-panel';
import { QuoteHeader } from '@/app/(application)/stock/[symbol]/components/quote-header';
import { RecommendationSymbols } from '@/app/(application)/stock/[symbol]/components/recommandation-symbols';
import { StockChart } from '@/app/(application)/stock/[symbol]/components/stock-chart';
import { TranscationHistory } from '@/app/(application)/stock/[symbol]/components/transcation-history';

export default async function Page({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;

  return (
    <div className="container mt-20 flex flex-col items-center gap-10">
      <QuoteHeader symbol={symbol} />

      <div className="flex w-full justify-between gap-4">
        <StockChart symbol={symbol} />
        <OrderPanel symbol={symbol} />
      </div>
      <KeyStats symbol={symbol} />
      <div className="flex h-1/4 w-full justify-between gap-4">
        <TranscationHistory symbol={symbol} />
        <NewsTable symbol={symbol} />
      </div>
      <RecommendationSymbols symbol={symbol} />
    </div>
  );
}
