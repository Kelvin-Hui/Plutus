import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBuyingPower, getProfolio, getTranscations } from '@/data/user';
import { calculateDiversity, calculatePNL, calculateROI } from '@/lib/utils';
import { ProfolioOverviewData, TranscationData } from '@/types';
import { ProfolioDiversity } from './profolio-diversity';

export function ProfolioOverview({
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

export function TranscationsHistory({ data }: { data: TranscationData[] }) {
  return <DataTable data={data} columns={transcationColumns} />;
}

export async function ProfolioInfo() {
  const [profolio, transcations, buyingPower] = await Promise.all([
    getProfolio(),
    getTranscations(),
    getBuyingPower(),
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
            <ProfolioDiversity profolio={profolio} buyingPower={buyingPower} />
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
