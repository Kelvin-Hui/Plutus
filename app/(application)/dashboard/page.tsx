import { BalanceChart } from "@/app/(application)/dashboard/components/BalanceChart"
import { ProfolioInfo } from "@/app/(application)/dashboard/components/ProfolioInfo"
import { TrendingSymbols } from "@/app/(application)/dashboard/components/TrendingSymbols"
import { WatchList } from "@/app/(application)/dashboard/components/WatchList"

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
