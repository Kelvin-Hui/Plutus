import { KeyStats } from '@/app/(application)/stock/[symbol]/components/key-stats';
import { NewsTable } from '@/app/(application)/stock/[symbol]/components/news-table';
import { OrderPanel } from '@/app/(application)/stock/[symbol]/components/order-panel';
import { QuoteHeader } from '@/app/(application)/stock/[symbol]/components/quote-header';
import { RecommendationSymbols } from '@/app/(application)/stock/[symbol]/components/recommandation-symbols';
import { StockChart } from '@/app/(application)/stock/[symbol]/components/stock-chart';
import { TranscationHistory } from '@/app/(application)/stock/[symbol]/components/transcation-history';
import { auth } from '@/auth';

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}) {
  return {
    title: params.symbol,
  };
}

export default async function Page({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div className="container mt-20 flex h-full flex-col items-center gap-10">
      <QuoteHeader symbol={symbol} userId={userId} />

      <div className="flex w-full flex-1 justify-between gap-4">
        <StockChart symbol={symbol} />
        <OrderPanel symbol={symbol} userId={userId} />
      </div>
      <KeyStats symbol={symbol} />
      <RecommendationSymbols symbol={symbol} />
      <div className="flex h-1/2 w-full flex-initial justify-between gap-4 pb-4">
        <TranscationHistory symbol={symbol} />
        <NewsTable symbol={symbol} />
      </div>
    </div>
  );
}
