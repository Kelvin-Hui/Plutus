import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transcationColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { getTranscations } from '@/data/user';

export async function TranscationHistory({ symbol }: { symbol: string }) {
  const data = await getTranscations(symbol);
  return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader>
        <CardTitle>Transcation History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={transcationColumns} filter={false} />
      </CardContent>
    </Card>
  );
}
