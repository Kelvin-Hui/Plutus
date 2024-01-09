import { getChartData } from '@/app/lib/data';
import { AreaChart, Card } from '@tremor/react';

export async function StockChart({ symbol }: { symbol: string }) {
  const [chartData, color] = await getChartData(symbol, '1m');

  return (
    <>
      <Card className="flex items-center">
        <AreaChart
          data={chartData}
          index="date"
          categories={['close']}
          colors={[color]}
          connectNulls={true}
          showLegend={false}
          autoMinValue={true}
        />
      </Card>
    </>
  );
}
