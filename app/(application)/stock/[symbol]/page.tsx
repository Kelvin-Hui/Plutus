import { QuoteHeader } from '@/components/QuoteHeader';
import { StockChart } from '@/components/StockChart';

export default async function Page({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;

  return (
    <div className="container mt-20 flex flex-col items-center gap-10">
      <QuoteHeader symbol={symbol} />
      <StockChart symbol={symbol} />
      <div>Panel</div>
      <div>Stats</div>
      <div>News</div>
      <div>Related Symbols</div>
    </div>
  );
}
