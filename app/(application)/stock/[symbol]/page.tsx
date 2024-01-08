import { KeyStats } from '@/components/KeyStats';
import { NewsTable } from '@/components/NewsTable';
import { OrderPanel } from '@/components/OrderPanel';
import { QuoteHeader } from '@/components/QuoteHeader';
import { RecommendationSymbols } from '@/components/RecommandationSymbols';
import { StockChart } from '@/components/StockChart';
import { TranscationHistory } from '@/components/TranscationHistory';

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
