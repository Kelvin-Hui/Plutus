import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChart } from "@tremor/react";

export function ProfolioDiversity(){
    const chartData = [
        {symbol : "CASH", value : Math.random() * 2000},
        {symbol : "AAPL", value : Math.random() * 1000},
        {symbol : "SPY", value : Math.random() * 1000},
    ]

    return(
        <DonutChart
            data={chartData}
            category="value"
            index="symbol"
            showLabel={false}
        />
    )
}

export function TradingPNL(){
    return(
        <div>TradingPNL</div>
    )
}

export function TranscationsHistory(){
    return(
        <div>Transcation History</div>
    )
}

export function ProfolioInfo(){

    

    return(
        <Tabs defaultValue={"chart"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chart">Profolio Diversity</TabsTrigger>
                <TabsTrigger value="list">Trading PNL</TabsTrigger>
                <TabsTrigger value="history">Recent Transcations</TabsTrigger>
            </TabsList>
            <Card>
            
            <TabsContent value="chart">
                    <CardHeader>
                        <CardTitle>Profolio Diversity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProfolioDiversity/>
                    </CardContent>
            </TabsContent>
            <TabsContent value="list">
                    <CardHeader>
                        <CardTitle>Trading PNL</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TradingPNL/>
                    </CardContent>
            </TabsContent>
            <TabsContent value="history">
                    <CardHeader>
                        <CardTitle>Recent Transcation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TranscationsHistory/>
                    </CardContent>
            </TabsContent>
            </Card>
        </Tabs>
    )
}