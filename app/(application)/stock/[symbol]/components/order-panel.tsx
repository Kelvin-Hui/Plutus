import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBuyingPower, getProfolio } from '@/data/user';
import { BuyForm } from './buy-form';
import { SellForm } from './sell-form';

export async function OrderPanel({
  symbol,
  userId,
}: {
  symbol: string;
  userId: string | undefined;
}) {
  const [buyingPower, profolioData] = await Promise.all([
    getBuyingPower(),
    getProfolio(symbol),
  ]);
  return (
    <Tabs defaultValue="buy" className="w-full lg:w-1/2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
      </TabsList>

      <TabsContent value="buy">
        <BuyForm
          symbol={symbol}
          userId={userId}
          buyingPower={buyingPower}
          profolioData={profolioData[0]}
        />
      </TabsContent>

      <TabsContent value="sell">
        <SellForm
          symbol={symbol}
          userId={userId}
          buyingPower={buyingPower}
          profolioData={profolioData[0]}
        />
      </TabsContent>
    </Tabs>
  );
}
