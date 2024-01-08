import { getTrendingSymbols } from "@/app/lib/data";
import { Quote } from "@/app/lib/definitions";
import { cn, numberFormat } from "@/app/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components//ui/card";
import { BadgeDelta } from "@tremor/react";
import Link from "next/link";

export function TrendingSymbolItem({quote} : {quote : Quote}){
    const {symbol, shortName, regularMarketPrice, regularMarketChangePercent, regularMarketVolume, averageDailyVolume10Day} = quote;

    const increasing = (regularMarketChangePercent?? 0) >= 0

    return(
        <div className="grid grid-cols-3">
            <div className="flex flex-col">
                <Link href={`/stock/${symbol}`} className="font-semibold">{symbol}</Link>
                <span className="text-muted-foreground text-sm">{shortName}</span>
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col items-center">
                    <h1 className="text-muted-foreground underline">Volume</h1>
                    <h1>{numberFormat(regularMarketVolume)}</h1>
                </div>
                
                <div className="flex flex-col items-center">
                    <h1 className="text-muted-foreground underline">Average Volume</h1>
                    <h1>{numberFormat(averageDailyVolume10Day)}</h1>
                </div>
                
            </div>
            <div className="flex items-center justify-self-end">
                <h1 className={cn("text-green-600",{"text-red-600" : !increasing})}>${regularMarketPrice}</h1>
                <BadgeDelta deltaType={increasing? "moderateIncrease" : "moderateDecrease"}>{regularMarketChangePercent?.toFixed(2)}%</BadgeDelta>
            </div>
        </div>
    )

}

export async function TrendingSymbols(){

    const trending = await getTrendingSymbols();
    console.log(trending);

    return(
        <Card>
            <CardHeader>
                <CardTitle>Trending Symbols</CardTitle>
                <CardDescription>{new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                {trending.map((quote) => {
                    return(
                        <TrendingSymbolItem key={"TrendingSymbol_"+quote.symbol} quote={quote}/>
                    )
                })}
            </CardContent>
        </Card>
    )
}