import { WatchList } from "@/components/WatchList"

export default function Page() {
  return(
    <div className="container mt-20 flex flex-col items-center gap-10">
    <div>ProfolioGraph</div>
    <div>DonutChart</div>
    <WatchList/>
    <div>TrendingSymbols</div>
    </div>
  )
}
