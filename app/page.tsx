import { NavBar } from '@/components/nav-bar';
import { SymbolCard } from '@/components/symbol-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getQuote } from '@/data/stock';
import { cn } from '@/lib/utils';
import { BanknotesIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { TrendingSymbols } from './(application)/dashboard/components/trending-symbols';

async function SymbolCarousel() {
  const symbols = [
    '^GSPC',
    '^DJI',
    '^IXIC',
    '^RUT',
    '^VIX',
    'META',
    'AMZN',
    'NFLX',
    'GOOG',
    'MSFT',
    'AAPL',
  ];
  const marketData = await getQuote(symbols);

  return (
    <section className="relative mt-10 min-h-[200px] overflow-hidden">
      <ul className="flex w-[calc(250px*10)] animate-infinite-loop justify-between space-x-2">
        {marketData.map((data: any, index: number) => {
          const {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChangePercent,
            regularMarketChange,
          } = data;
          return (
            <SymbolCard
              key={'0_' + symbol}
              symbol={symbol}
              shortName={shortName}
              regularMarketPrice={regularMarketPrice}
              regularMarketChangePercent={regularMarketChangePercent}
              regularMarketChange={regularMarketChange}
            />
          );
        })}
        {marketData.map((data: any, index: number) => {
          const {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChangePercent,
            regularMarketChange,
          } = data;
          return (
            <SymbolCard
              key={'1_' + symbol}
              symbol={symbol}
              shortName={shortName}
              regularMarketPrice={regularMarketPrice}
              regularMarketChangePercent={regularMarketChangePercent}
              regularMarketChange={regularMarketChange}
            />
          );
        })}
      </ul>
    </section>
  );
}

function HomeHeader() {
  return (
    <section className="mx-auto space-y-10">
      <h6 className="text-5xl font-semibold leading-tight tracking-tight">
        Learn How To{' '}
        <span className="decroation-green-300 animate-pulse text-7xl text-green-500 underline decoration-dotted  decoration-2 underline-offset-4 hover:cursor-dollar">
          Invest
        </span>{' '}
        Without The Risk
      </h6>
      <span className="text-4xl text-muted-foreground">
        Experience the thrill of stock trading
        <span className="block text-3xl text-muted-foreground">
          It won't cost you a penny 1¢
        </span>
      </span>

      <div className="flex items-center justify-start">
        <Link href="/dashboard">
          <Button variant="outline">Let's Get Started🎉</Button>
        </Link>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className={cn('border-2 shadow-xl')}>
      <CardHeader className={cn('hover:bg-muted/50')}>
        <CardTitle>
          <div className="flex flex-col items-center">
            {icon}
            {title}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
function Features() {
  const iconStyle = 'h-20 w-20 mb-4';
  const features = [
    {
      icon: <BanknotesIcon className={cn(iconStyle, 'text-green-500')} />,
      title: 'Risk Free',
      description: 'Trading with paper money💵',
    },
    {
      icon: <UserIcon className={cn(iconStyle, 'text-slate-500')} />,
      title: 'Easy Signup',
      description: 'Signup with just a username👤',
    },
  ];
  return (
    <section className="mx-auto mt-20 flex flex-col items-center justify-evenly gap-4 md:flex-row">
      {features.map((feat) => {
        const { icon, title, description } = feat;
        return (
          <FeatureCard
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        );
      })}
    </section>
  );
}

function CopyrightFooter() {
  return (
    <footer className="mx-auto mt-auto text-sm">{`Plutus@${new Date().getFullYear()}`}</footer>
  );
}

export default function Home() {
  return (
    <div className="container flex h-screen flex-col">
      <NavBar showUserRelated={false} />
      <SymbolCarousel />
      <div className="flex h-2/3 flex-grow-0 flex-col  items-center gap-2 lg:flex-row">
        <div>
          <HomeHeader />
          <Features />
        </div>
        <TrendingSymbols />
      </div>

      <CopyrightFooter />
    </div>
  );
}
