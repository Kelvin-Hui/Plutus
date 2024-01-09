import { PNLData, TranscationData } from '@/app/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonutChart } from '@tremor/react';

export function ProfolioDiversity() {
  const chartData = [
    { symbol: 'CASH', value: Math.random() * 2000 },
    { symbol: 'AAPL', value: Math.random() * 1000 },
    { symbol: 'SPY', value: Math.random() * 1000 },
  ];

  return (
    <DonutChart
      data={chartData}
      category="value"
      index="symbol"
      showLabel={false}
      className="h-72 w-72"
    />
  );
}

export function TradingPNL() {
  const tableData: PNLData[] = [
    {
      symbol: 'AAPL',
      shares: 20,
      averageCost: 150.81,
      pnl: 300,
      diversity: 0.5,
    },
    { symbol: 'SPY', shares: 10, averageCost: 397.8, pnl: 500, diversity: 0.5 },
  ];

  return <DataTable data={tableData} columns={pnlColumns} />;
}

export function TranscationsHistory() {
  const data: TranscationData[] = [
    {
      date: new Date(),
      shares: -5,
      cost: 185.1,
      userId: '1321321',
    },
    {
      date: new Date(),
      shares: 10,
      cost: 184.1,
      userId: '1321321',
    },
    {
      date: new Date(),
      shares: -5,
      cost: 185.1,
      userId: '1321321',
    },
    {
      date: new Date(),
      shares: 10,
      cost: 184.1,
      userId: '1321321',
    },
    {
      date: new Date(),
      shares: -5,
      cost: 185.1,
      userId: '1321321',
    },
    {
      date: new Date(),
      shares: 10,
      cost: 184.1,
      userId: '1321321',
    },
  ];
  return <DataTable data={data} columns={transcationColumns} />;
}

export function ProfolioInfo() {
  return (
    <Tabs defaultValue={'chart'} className="h-full w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="chart">Profolio Diversity</TabsTrigger>
        <TabsTrigger value="list">Trading PNL</TabsTrigger>
        <TabsTrigger value="history">Recent Transcations</TabsTrigger>
      </TabsList>
      <Card>
        <TabsContent value="chart">
          <CardHeader>
            <CardTitle>Profolio Diversity</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ProfolioDiversity />
          </CardContent>
        </TabsContent>
        <TabsContent value="list">
          <CardHeader>
            <CardTitle>Trading PNL</CardTitle>
          </CardHeader>
          <CardContent>
            <TradingPNL />
          </CardContent>
        </TabsContent>
        <TabsContent value="history">
          <CardHeader>
            <CardTitle>Recent Transcation</CardTitle>
          </CardHeader>
          <CardContent>
            <TranscationsHistory />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
