import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBalanceChartData } from '@/data/user';
import { AreaChart } from '@tremor/react';

export async function BalanceChart() {
  const chartData = await getBalanceChartData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={chartData}
          index="createdAt"
          categories={['balance']}
          colors={['green']}
          autoMinValue={true}
          curveType="monotone"
          connectNulls={true}
        />
      </CardContent>
    </Card>
  );
}
