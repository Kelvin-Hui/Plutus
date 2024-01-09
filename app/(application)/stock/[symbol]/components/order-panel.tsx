import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function OrderPanel({ symbol }: { symbol: string }) {
  return (
    <Tabs defaultValue="buy" className="w-1/2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
      </TabsList>

      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle>{symbol}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div> Form here</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600">Buy</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle>{symbol}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div> Form here</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-red-600">Sell</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
