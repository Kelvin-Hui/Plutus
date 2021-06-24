import React from "react";

//Import scss
import "./SearchQuote.scss";

//Import Axios for API calling
import axios from "axios";
//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";

//Import Content Components
import Description from "./Description";
import Chart from "./Chart";
import BuySellBtn from "./BuySellBtn";
import Financial from "./Financial";
import KeyStatistic from "./KeyStatistic";

// function getSymbolInfo(symbol, query) {
//     const datetime = new Date();
//     const modules = `?modules=${query},` + datetime.valueOf();
//     axios
//         .get(
//             `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
//         )
//         .then((response) => JSON.parse(response.data.contents))
//         .then((res) => console.table(res.quoteSummary.result[0][query]))
//         .catch((err) => console.log(err + query));
// }

export default function SearchQuote() {
    console.log("rendered SQ");
    const [symbol, setSymbol] = React.useState("MSFT");

    // React.useEffect(() => {
    //     // getSymbolInfo(symbol, "price");
    //     // getSymbolInfo(symbol, "summaryProfile");
    //     // getSymbolInfo(symbol, "summaryDetail");
    //     // Financial Earning / Revenue
    //     // getSymbolInfo(symbol, "incomeStatementHistory");
    // }, [symbol]);

    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
            />
            <div className="CardGrid">
                <Description symbol={symbol} />
                {/* <BuySellBtn /> */}
                <Chart symbol={symbol} />
                {/* <KeyStatistic symbol={symbol} />
                <Financial /> */}
            </div>
        </div>
    );
}
