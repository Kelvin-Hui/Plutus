import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getQuoteNews } from '@/data/stock';
import { cn } from '@/lib/utils';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export function NewsItem({
  title,
  link,
  publisher,
  publishTime,
  imageURL,
}: {
  title: string;
  link: string;
  publisher: string;
  publishTime: string;
  imageURL: any;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="mb-4 flex rounded-md border-2 border-solid p-4 hover:bg-muted/50"
    >
      <header className="w-full">
        <h2 className="text-xs font-medium sm:text-lg lg:text-xl">{title}</h2>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
          <span className="mr-4 text-xs text-muted-foreground sm:text-base lg:text-lg">
            {publishTime}
          </span>
          <Badge>{publisher}</Badge>
        </div>
      </header>

      {!imageURL ? (
        <PhotoIcon width={96} height={96} />
      ) : (
        <Image
          unoptimized
          alt="thumbnail"
          src={imageURL}
          width={64}
          height={64}
          className="h-16 w-16 sm:h-24 sm:w-24"
        />
      )}
    </a>
  );
}

export async function NewsTable({ symbol }: { symbol: string }) {
  const news = await getQuoteNews(symbol);
  return (
    <Card className="max-h-[750px] overflow-auto">
      <CardHeader className={cn('sticky top-0')}>
        <CardTitle>Recent News</CardTitle>
      </CardHeader>
      <CardContent>
        {news.map((newsObj) => {
          const { title, link, providerPublishTime, publisher, thumbnail } =
            newsObj;
          return (
            <NewsItem
              key={title}
              title={title}
              link={link}
              publisher={publisher}
              publishTime={providerPublishTime}
              imageURL={thumbnail?.resolutions[1]?.url}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
