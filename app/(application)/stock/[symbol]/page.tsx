import { KeyStats } from '@/app/(application)/stock/[symbol]/components/KeyStats';
import { NewsTable } from '@/app/(application)/stock/[symbol]/components/NewsTable';
import { OrderPanel } from '@/app/(application)/stock/[symbol]/components/OrderPanel';
import { QuoteHeader } from '@/app/(application)/stock/[symbol]/components/QuoteHeader';
import { RecommendationSymbols } from '@/app/(application)/stock/[symbol]/components/RecommandationSymbols';
import { StockChart } from '@/app/(application)/stock/[symbol]/components/StockChart';
import { TranscationHistory } from '@/app/(application)/stock/[symbol]/components/TranscationHistory';

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
