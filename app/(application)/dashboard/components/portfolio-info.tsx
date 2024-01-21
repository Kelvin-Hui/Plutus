import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pnlColumns, transactionColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBuyingPower, getPortfolio, getTransactions } from '@/data/user';
import {
  calculateDiversity,
  calculatePNL,
  calculateROI,
  calculateTodayReturn,
} from '@/lib/utils';
import { PortfolioOverviewData, TransactionData } from '@/types';
import { PortfolioDiversity } from './portfolio-diversity';

export function PortfolioOverview({
  portfolio,
  transactionData,
}: {
  portfolio: PortfolioOverviewData[];
  transactionData: TransactionData[];
}) {
  const totalPortfolioValue = portfolio.reduce(
    (acc, curr) => acc + curr.marketPrice * curr.quantity,
    0,
  );

  const data = portfolio.map((row) => {
    return {
      ...row,
      pnl: calculatePNL(row.marketPrice, row.cost, row.quantity),
      roi: calculateROI(row.marketPrice, row.cost, row.quantity),
      diversityPercentage: calculateDiversity(
        row.marketPrice,
        row.quantity,
        totalPortfolioValue,
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

export async function PortfolioInfo() {
  const [portfolio, transactions, buyingPower] = await Promise.all([
    getPortfolio(),
    getTransactions(),
    getBuyingPower(),
  ]);

  return (
    <Tabs defaultValue={'overview'} className="">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="chart">
          <h6 className="text-xs sm:text-base">Diversity</h6>
        </TabsTrigger>
        <TabsTrigger value="overview">
          <h6 className="text-xs sm:text-base">Overview</h6>
        </TabsTrigger>
        <TabsTrigger value="history">
          <h6 className="text-xs sm:text-base">Transaction</h6>
        </TabsTrigger>
      </TabsList>
      <Card className="">
        <TabsContent value="chart">
          <CardHeader>
            <CardTitle>Portfolio Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioDiversity
              portfolio={portfolio}
              buyingPower={buyingPower}
            />
          </CardContent>
        </TabsContent>
        <TabsContent value="overview">
          <CardHeader>
            <CardTitle>Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioOverview
              portfolio={portfolio}
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
