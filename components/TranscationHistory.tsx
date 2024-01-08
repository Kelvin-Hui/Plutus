import { cn } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

export function TranscationHistory({ symbol }: { symbol: string }) {
  const data = [
    {
      date: new Date(),
      shares: -5,
      price: 185.1,
      userId: 123123,
    },
    {
      date: new Date(),
      shares: 10,
      price: 184.1,
      userId: 123123,
    },
    {
      date: new Date(),
      shares: -5,
      price: 185.1,
      userId: 123123,
    },
    {
      date: new Date(),
      shares: 10,
      price: 184.1,
      userId: 123123,
    },
    {
      date: new Date(),
      shares: -5,
      price: 185.1,
      userId: 123123,
    },
    {
      date: new Date(),
      shares: 10,
      price: 184.1,
      userId: 123123,
    },
  ];

  return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader>
        <CardTitle>Transcation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Time</TableHeaderCell>
              <TableHeaderCell>Shares</TableHeaderCell>
              <TableHeaderCell>Cost</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow key={row.date.valueOf()}>
                  <TableCell>{row.date.toLocaleString()}</TableCell>
                  <TableCell
                    className={cn('text-green-600', {
                      'text-red-600': row.shares < 0,
                    })}
                  >
                    {row.shares}
                  </TableCell>
                  <TableCell>${row.price}</TableCell>
                  <TableCell>${-row.shares * row.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
