import { BalanceChart } from "@/app/(application)/dashboard/components/BalanceChart"
import { WatchList } from "@/app/(application)/dashboard/components/WatchList"
import { ProfolioInfo } from "./components/ProfolioInfo"
import { TrendingSymbols } from "./components/TrendingSymbols"

export default function Page() {
  return(
    <div className="container mt-20 grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        <BalanceChart/>
        <ProfolioInfo/>
      </div>
      
      <div className="col-span-1 flex flex-col gap-4">
          <WatchList/>
          <TrendingSymbols/>
      </div>
      
    </div>
  )
}
