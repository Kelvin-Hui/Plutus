import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transactionColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { getTransactions } from '@/data/user';

export async function TransactionHistory({ symbol }: { symbol: string }) {
  const data = await getTransactions(symbol);
  return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={transactionColumns} filter={false} />
      </CardContent>
    </Card>
  );
}
