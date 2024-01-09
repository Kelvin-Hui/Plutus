import { BalanceChart } from "@/components/BalanceChart"
import { ProfolioInfo } from "@/components/ProfolioInfo"
import { TrendingSymbols } from "@/components/TrendingSymbols"
import { WatchList } from "@/components/WatchList"

export default function Page() {
  return(
    <div className="container mt-20 flex flex-col items-center gap-10">
    <div>Dashboard Headers</div>
    <BalanceChart/>
    <ProfolioInfo/>
    <WatchList/>
    <TrendingSymbols/>
    </div>
  )
}
