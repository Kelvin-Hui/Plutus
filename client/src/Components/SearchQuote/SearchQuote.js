import React from "react";

//Import Axios for API calling
import axios from "axios";
//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";

function getQuote(symbol) {
    const datetime = new Date();
    const modules = "?modules=price," + datetime.valueOf();

    axios
        .get(
            `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
        )
        .then((response) => JSON.parse(response.data.contents))
        .then((res) => console.table(res.quoteSummary.result[0].price))
        .catch((err) => console.log(err));
}

function getSummary(symbol) {
    const datetime = new Date();
    const modules = "?modules=assetProfile," + datetime.valueOf();

    axios
        .get(
            `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
        )
        .then((response) => JSON.parse(response.data.contents))
        .then((res) => console.table(res.quoteSummary.result[0].assetProfile))
        .catch((err) => console.log(err));
}

export default function SearchQuote() {
    const [symbol, setSymbol] = React.useState("AAPL");

    React.useEffect(() => {
        getQuote(symbol);
        getSummary(symbol);
    }, [symbol]);

    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote"
                setSymbol={setSymbol}
            />
        </div>
    );
}
