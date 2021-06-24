import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import Axios for API calling
import axios from "axios";

export default function Description({ symbol }) {
    const [companyInfo, SetCompanyInfo] = React.useState({
        empty: true,
        tags: [null, null],
        percent: { raw: null, fmt: null },
    });

    React.useEffect(() => {
        getSymbolInfo(symbol, "summaryProfile,price");
    }, [symbol]);

    function getSymbolInfo(symbol, query) {
        const datetime = new Date();
        const modules = `?modules=${query},` + datetime.valueOf();
        axios
            .get(
                `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
            )
            .then((response) => JSON.parse(response.data.contents))
            .then((res) => res.quoteSummary.result[0])
            .then((result) => {
                SetCompanyInfo({
                    companyName: result["price"].longName,
                    currPrice: result["price"].regularMarketPrice.raw,
                    percent: result["price"].regularMarketChangePercent,
                    tags: [
                        result["summaryProfile"].sector,
                        result["summaryProfile"].industry,
                    ],
                    summary: result["summaryProfile"].longBusinessSummary,
                    website: result["summaryProfile"].website,
                    empty: false,
                });
            })
            .catch((err) => console.log(err + query));
    }

    return (
        <div className="Description">
            <Card>
                <h3 className="Title">
                    {companyInfo.companyName} {companyInfo.website}
                </h3>
                <div className="Tags">
                    {companyInfo.tags.map((tag, idx) => {
                        return (
                            <div className="TagsItem" key={idx + tag}>
                                {tag}
                            </div>
                        );
                    })}
                </div>

                <p className="Summary">{companyInfo.summary}</p>
                <div className="CurrentPrice">
                    {companyInfo.currPrice} {companyInfo.percent.fmt}
                </div>
            </Card>
        </div>
    );
}
