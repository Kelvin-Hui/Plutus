import React from "react";

//Import scss
import "./SearchQuote.scss";

//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";

//Import Content Components
import Description from "./Description";
import Chart from "./Chart/Chart";
import KeyStatistic from "./KeyStatistic";
import IncomeStatement from "./Financial/IncomeStatement";

export default function SearchQuote() {
    console.log("rendered SQ");
    const [symbol, setSymbol] = React.useState("AAPL");

    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
            />
            <div className="CardGrid_SearchQuote">
                {/* <IncomeStatement symbol={symbol} /> */}
                {/* <Description symbol={symbol} /> */}
                {/* <BuySellBtn /> */}
                <Chart symbol={symbol} />
                {/* <KeyStatistic symbol={symbol} /> */}
            </div>
        </div>
    );
}
