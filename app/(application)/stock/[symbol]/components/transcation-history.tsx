import { TranscationData } from '@/app/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';

export function TranscationHistory({ symbol }: { symbol: string }) {
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

  return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader>
        <CardTitle>Transcation History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={transcationColumns} />
      </CardContent>
    </Card>
  );
}
