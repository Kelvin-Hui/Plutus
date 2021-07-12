import React from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";
import PieChart from "./PieChart";

export default function AccountInfo({
    portfolioData,
    portfolioValue,
    cashValue,
}) {
    let pieChartData = { Cash: (cashValue / portfolioValue).toFixed(4) };

    cashValue = cashValue === undefined ? 0 : cashValue;
    portfolioValue = portfolioValue === undefined ? 0 : portfolioValue;

    portfolioData.map((d, idx) => {
        pieChartData[d.symbol] = (d.marketValue / portfolioValue).toFixed(4);
    });

    console.log(pieChartData);

    return (
        <div className="AccountInfo">
            <Card>
                <span>Cash Buying Power: ${cashValue.toFixed(2)}</span>
                <span>
                    Stocks Value : ${(portfolioValue - cashValue).toFixed(2)}
                </span>

                <PieChart
                    pieChartData={pieChartData}
                    portfolioValue={portfolioValue}
                />
            </Card>
        </div>
    );
}
