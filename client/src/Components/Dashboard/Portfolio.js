import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

//Import UserContext
import UserContext from "../../Context/UserContext";

//Import clsx
import clsx from "clsx";

export default function Portfolio({ portfolioData, portfolioValue }) {
    const { setNav } = React.useContext(UserContext);
    portfolioData = portfolioData.sort((a, b) => b.marketValue - a.marketValue);

    const columns = [
        "Symbol",
        "Company Name",
        "Position",
        "Average Cost",
        "Last Price",
        "Market Value",
        "Portfolio Diversity",
        "Today Return",
        "Total Return",
    ];

    return (
        <div className="Portfolio">
            <Card>
                <table className="PortfolioTable">
                    <thead>
                        <tr className="ColName">
                            {columns.map((col, idx) => {
                                return <th key={col + idx}>{col}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.length !== 0 &&
                            portfolioData.map((data, idx) => {
                                const todayReturnGain =
                                    data.todayReturn.raw >= 0;
                                const totalReturnGain =
                                    data.totalReturn.raw >= 0;
                                return (
                                    <tr
                                        className="Row"
                                        key={"portfolio_" + idx}
                                    >
                                        <td
                                            className="Symbol"
                                            onClick={() =>
                                                setNav({
                                                    currentPage: "Search Quote",
                                                    symbol: data.symbol,
                                                })
                                            }
                                        >
                                            {data.symbol}
                                        </td>
                                        <td>{data.companyName}</td>
                                        <td>{data.position}</td>
                                        <td>${data.averageCost}</td>
                                        <td>${data.currentPrice}</td>
                                        <td>${data.marketValue}</td>
                                        <td>
                                            {parseFloat(
                                                data.marketValue /
                                                    portfolioValue
                                            ).toFixed(2) + "%"}
                                        </td>
                                        <td
                                            className={clsx({
                                                Up: todayReturnGain,
                                                Down: !todayReturnGain,
                                            })}
                                        >
                                            ${data.todayReturn.raw}(
                                            {data.todayReturn.fmt})
                                        </td>
                                        <td
                                            className={clsx({
                                                Up: totalReturnGain,
                                                Down: !totalReturnGain,
                                            })}
                                        >
                                            ${data.totalReturn.raw}(
                                            {data.totalReturn.fmt})
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
