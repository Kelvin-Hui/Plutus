import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart } from '@tremor/react';

function craeteFakeChartData() {
  let chartData = [];
  let baseDate = new Date('2023-11-11');
  let baseAmount = 25000;
  for (let i = 0; i < 30; i++) {
    chartData.push({ date: baseDate.toLocaleDateString(), amount: baseAmount });
    let nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + 1);
    baseDate = nextDate;
    baseAmount += (Math.random() >= 0.5 ? 1 : -1) * (Math.random() * 2000);
  }
  return chartData;
}

export function BalanceChart() {
  const chartData = craeteFakeChartData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={chartData}
          index="date"
          categories={['amount']}
          colors={['green']}
          autoMinValue={true}
          curveType="monotone"
          connectNulls={true}
        />
      </CardContent>
    </Card>
  );
}
