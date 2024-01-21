import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transactionColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { getTransactions } from '@/data/user';
import { cn } from '@/lib/utils';

export async function TransactionHistory({ symbol }: { symbol: string }) {
  const data = await getTransactions(symbol);
  return (
    <Card className="max-h-[750px] overflow-auto">
      <CardHeader className={cn('sticky top-0 z-10 bg-background')}>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={transactionColumns} filter={false} />
      </CardContent>
    </Card>
  );
}
