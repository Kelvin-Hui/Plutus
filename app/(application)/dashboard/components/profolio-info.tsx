import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBuyingPower, getProfolio, getTranscations } from '@/data/user';
import { calculateDiversity, calculatePNL, calculateROI } from '@/lib/utils';
import { ProfolioOverviewData, TranscationData } from '@/types';
import { DonutChart } from '@tremor/react';

export async function ProfolioDiversity({
  profolio,
}: {
  profolio: ProfolioOverviewData[];
}) {
  const data = profolio.map((row) => {
    return { ...row, marketValue: row.quantity * row.marketPrice };
  });
  return (
    <DonutChart
      data={[...data, { symbol: '$CASH', marketValue: await getBuyingPower() }]}
      category="marketValue"
      index="symbol"
      // showLabel={false}
      className="h-[24rem] w-[24rem]"
      colors={[
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
      ]}
    />
  );
}

export async function ProfolioOverview({
  profolio,
}: {
  profolio: ProfolioOverviewData[];
}) {
  const totalProfolioValue = profolio.reduce(
    (acc, curr) => acc + curr.marketPrice * curr.quantity,
    0,
  );

  const data = profolio.map((row) => {
    return {
      ...row,
      pnl: calculatePNL(row.marketPrice, row.cost, row.quantity),
      roi: calculateROI(row.marketPrice, row.cost, row.quantity),
      diversityPercentage: calculateDiversity(
        row.marketPrice,
        row.quantity,
        totalProfolioValue,
      ),
    };
  });
  return <DataTable data={data} columns={pnlColumns} />;
}

export async function TranscationsHistory({
  data,
}: {
  data: TranscationData[];
}) {
  return <DataTable data={data} columns={transcationColumns} />;
}

export async function ProfolioInfo() {
  const [profolio, transcations] = await Promise.all([
    getProfolio(),
    getTranscations(),
  ]);

  return (
    <Tabs defaultValue={'overview'} className="h-full w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="chart">Profolio Diversity</TabsTrigger>
        <TabsTrigger value="overview">Profolio Overview</TabsTrigger>
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
        <TabsContent value="overview">
          <CardHeader>
            <CardTitle>Profolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfolioOverview profolio={profolio} />
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
