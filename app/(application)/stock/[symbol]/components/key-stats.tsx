import { ReadMoreWrapper } from '@/components/read-more';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSummaryDetail } from '@/data/stock';
import { numberFormat } from '@/lib/utils';

export async function KeyStats({ symbol }: { symbol: string }) {
  const { summaryDetail: stats, assetProfile: company } =
    await getSummaryDetail(symbol, ['summaryDetail', 'assetProfile']);

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
        <CardTitle>About - {symbol}</CardTitle>
        <CardDescription>
          <ReadMoreWrapper text={company?.longBusinessSummary} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          {labels.map((obj, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <h2 className="text-muted-foreground underline">{obj.key}</h2>
                <span>{numberFormat(stats?.[obj.value]) ?? 'Unavailable'}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
