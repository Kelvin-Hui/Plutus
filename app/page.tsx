import { NavBar } from '@/components/nav-bar';
import { SymbolCard } from '@/components/symbol-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getQuotes } from '@/data/stock';
import { cn } from '@/lib/utils';
import { BanknotesIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { TrendingSymbols } from '../components/trending-symbols';

async function SymbolCarousel() {
  const symbols = ['^GSPC', '^DJI', '^IXIC', '^RUT', '^VIX'];
  const marketData = await getQuotes(symbols);

  return (
    <section className="relative my-5 min-h-[150px] overflow-hidden">
      <ul className="flex w-[calc(250px*10)] animate-infinite-loop space-x-2">
        {marketData.map((data: any) => {
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
        {marketData.map((data: any) => {
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
    <section className="mx-auto mt-5 flex flex-col items-center gap-y-4 text-center">
      <h6 className="text-3xl font-semibold leading-tight tracking-tight md:text-6xl">
        Learn How To &nbsp;
        <span className="animate-pulse text-5xl text-green-500 underline decoration-dotted decoration-2 underline-offset-4 hover:cursor-dollar md:text-8xl">
          Invest
        </span>
        &nbsp; Without The Risk
      </h6>
      <span className="text-2xl text-muted-foreground md:text-4xl">
        Experience the thrill of stock trading
        <span className="block text-xl text-muted-foreground md:text-3xl">
          It won&apos;t cost you a penny 1¢
        </span>
      </span>
      <Link href="/dashboard">
        <Button variant="default">Let&apos;s Get Started🎉</Button>
      </Link>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className={cn('border-4 shadow-xl')}>
      <CardHeader className={cn('hover:bg-muted/50')}>
        <CardTitle>
          <div className="flex flex-col items-center text-sm sm:text-xl">
            {icon}
            {title}
          </div>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
function Features() {
  const iconStyle = 'h-20 w-20';
  const features = [
    {
      icon: <BanknotesIcon className={cn(iconStyle, 'text-green-500')} />,
      title: 'Risk Free',
      description: 'Trading with paper money💵',
    },
    {
      icon: <UserIcon className={cn(iconStyle, 'text-slate-500')} />,
      title: 'Easy Signup',
      description: 'We just need a username 👤',
    },
  ];
  return (
    <section className="mt-10 flex justify-evenly gap-2 px-2">
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

export const revalidate = 60;

export default function Home() {
  return (
    <div className="mt-16 flex flex-col sm:container">
      <NavBar showUserRelated={false} />
      <SymbolCarousel />
      <section className="lg:grid lg:grid-cols-2 lg:gap-x-4">
        <div>
          <HomeHeader />
          <Features />
        </div>
        <TrendingSymbols />
      </section>

      {/* <CopyrightFooter/> */}
    </div>
  );
}
