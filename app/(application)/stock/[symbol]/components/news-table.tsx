import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getQuoteNews } from '@/data/stock';
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
  publishTime: Date;
  imageURL: any;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="container mb-4 flex flex-row justify-between rounded-md border-2 border-solid p-4 hover:bg-muted/50"
    >
      <header>
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex">
          <span className="mr-4 text-muted-foreground">
            {publishTime.toLocaleString()}
          </span>
          <Badge>{publisher}</Badge>
        </div>
      </header>
      {!imageURL ? (
        <PhotoIcon width={140} height={140} className="h-auto w-auto" />
      ) : (
        <Image
          alt="thumbnail"
          src={imageURL}
          width={72}
          height={72}
          className="h-auto w-auto"
        />
      )}
    </a>
  );
}

export async function NewsTable({ symbol }: { symbol: string }) {
  const news = await getQuoteNews(symbol);

  return (
    <Card className="h-full w-full overflow-auto">
      <CardHeader>
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
