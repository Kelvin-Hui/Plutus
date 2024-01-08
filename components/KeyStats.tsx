import { getSummaryDetail } from '@/app/lib/data';
import { numberFormat } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function KeyStats({ symbol }: { symbol: string }) {
  const stats = await getSummaryDetail(symbol);

  const labels = [
    { key: 'Previous Close', value: 'previousClose' },
    { key: 'Open', value: 'open' },
    { key: 'Low', value: 'dayLow' },
    { key: 'High', value: 'dayHigh' },
    { key: 'MA 50D', value: 'fiftyDayAverage' },
    { key: 'MA 200D', value: 'twoHundredDayAverage' },
    { key: 'Volume', value: 'volume' },
    { key: 'Average Volume', value: 'averageVolume' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Key Statistic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          {labels.map((obj, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <h2 className="text-muted-foreground underline">{obj.key}</h2>
                <span>{numberFormat(stats?.[obj.value]) ?? "Unavailable"}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
