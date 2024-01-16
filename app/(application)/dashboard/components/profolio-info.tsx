import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transactionColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBuyingPower, getProfolio, getTransactions } from '@/data/user';
import {
  calculateDiversity,
  calculatePNL,
  calculateROI,
  calculateTodayReturn,
} from '@/lib/utils';
import { ProfolioOverviewData, TransactionData } from '@/types';
import { ProfolioDiversity } from './profolio-diversity';

export function ProfolioOverview({
  profolio,
  transactionData,
}: {
  profolio: ProfolioOverviewData[];
  transactionData: TransactionData[];
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
      todayReturn: calculateTodayReturn(
        row.marketPrice,
        row.marketChange,
        row.quantity,
        row.marketPreviousClose,
        transactionData.filter((data) => data.symbol == row.symbol),
      ),
    };
  });
  return (
    <DataTable
      data={data}
      columns={pnlColumns}
      colHeaderMap={{
        quantity: 'Position',
        cost: 'AverageCost',
        pnl: 'PNL',
        roi: 'ROI',
        diversityPercentage: 'Diversity',
      }}
    />
  );
}

export function TransactionsHistory({ data }: { data: TransactionData[] }) {
  return (
    <DataTable
      data={data}
      columns={transactionColumns}
      colHeaderMap={{ createdAt: 'Date' }}
    />
  );
}

export async function ProfolioInfo() {
  const [profolio, transactions, buyingPower] = await Promise.all([
    getProfolio(),
    getTransactions(),
    getBuyingPower(),
  ]);

  return (
    <Tabs defaultValue={'overview'} className="h-full w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="chart">Profolio Diversity</TabsTrigger>
        <TabsTrigger value="overview">Profolio Overview</TabsTrigger>
        <TabsTrigger value="history">Recent Transactions</TabsTrigger>
      </TabsList>
      <Card className="h-full">
        <TabsContent value="chart">
          <CardHeader>
            <CardTitle>Profolio Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfolioDiversity profolio={profolio} buyingPower={buyingPower} />
          </CardContent>
        </TabsContent>
        <TabsContent value="overview">
          <CardHeader>
            <CardTitle>Profolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfolioOverview
              profolio={profolio}
              transactionData={transactions}
            />
          </CardContent>
        </TabsContent>
        <TabsContent value="history">
          <CardHeader>
            <CardTitle>Recent Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsHistory data={transactions} />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
