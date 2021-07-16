import React from "react";

//Import scss
import "./SearchQuote2.scss";
//Import d3 time format
import { timeFormat } from "d3";
//Import Needed SVG
import { ReactComponent as Websitelogo } from "../../Assets/website.svg";

export default function StockInfo({ stockInfo }) {
    const format = timeFormat("%b %d %Y %I:%M %p");
    return (
        <div className="StockInfo">
            <div
                className="CompanyName"
                symbol={stockInfo.symbol}
                exchange={stockInfo.exchangeName}
            >
                <h1>{stockInfo.name}</h1>
                {stockInfo.website && (
                    <a target="_blank" href={stockInfo.website}>
                        <Websitelogo className="webLogo" />
                    </a>
                )}
            </div>
            <div className="Tags">
                {stockInfo.sector && (
                    <div className="Sector">{stockInfo.sector}</div>
                )}
                {stockInfo.industry && (
                    <div className="Industry">{stockInfo.industry}</div>
                )}
            </div>
            {stockInfo.lastPrice && (
                <>
                    <h1 className="Price" currency={stockInfo.currency}>
                        {stockInfo.lastPrice}
                    </h1>
                    <div className="PriceChange" time={format(new Date())}>
                        <h2 style={{ color: stockInfo.color }}>
                            {stockInfo.priceChange}
                        </h2>
                        <h2 style={{ color: stockInfo.color }}>
                            ({stockInfo.priceChangePercent})
                        </h2>
                    </div>
                </>
            )}
        </div>
    );
}
