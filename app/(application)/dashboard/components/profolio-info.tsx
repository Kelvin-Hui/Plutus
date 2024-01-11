import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProfolio, getTranscations } from '@/data/user';
import { ProfolioItemData, TranscationData } from '@/types';
import { DonutChart } from '@tremor/react';

export async function ProfolioDiversity({
  profolio,
}: {
  profolio: ProfolioItemData[];
}) {
  const data = profolio.map((row) => {
    return { ...row, marketValue: row.quantity * row.marketPrice };
  });
  return (
    <DonutChart
      data={[...data, { symbol: '$CASH', marketValue: 2000 }]}
      category="marketValue"
      index="symbol"
      // showLabel={false}
      className="h-72 w-72"
    />
  );
}

export function TradingPNL({ profolio }: { profolio: ProfolioItemData[] }) {
  const data = profolio.map((row) => {
    return { ...row, pnl: (row.marketPrice - row.cost) * row.quantity };
  });
  return <DataTable data={data} columns={pnlColumns} />;
}

export async function TranscationsHistory({
  data,
}: {
  data: TranscationData[];
}) {
  console.log(data);
  return <DataTable data={data} columns={transcationColumns} />;
}

export async function ProfolioInfo() {
  const [profolio, transcations] = await Promise.all([
    getProfolio(),
    getTranscations(),
  ]);

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
            <ProfolioDiversity profolio={profolio} />
          </CardContent>
        </TabsContent>
        <TabsContent value="list">
          <CardHeader>
            <CardTitle>Trading PNL</CardTitle>
          </CardHeader>
          <CardContent>
            <TradingPNL profolio={profolio} />
          </CardContent>
        </TabsContent>
        <TabsContent value="history">
          <CardHeader>
            <CardTitle>Recent Transcation</CardTitle>
          </CardHeader>
          <CardContent>
            <TranscationsHistory data={transcations} />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
