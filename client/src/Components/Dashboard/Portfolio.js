import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

export default function Portfolio({ portfolioData, portfolioValue }) {
    portfolioData = portfolioData.sort((a, b) => b.marketValue - a.marketValue);

    const columns = [
        "Symbol",
        "Company Name",
        "Position",
        "Average Cost ($)",
        "Market Value ($)",
        "Portfolio Diversity (%)",
        "Today Return (%)",
        "Total Return (%)",
    ];

    console.log(portfolioData);
    return (
        <div className="Portfolio">
            <Card>
                <table className="PortfolioTable">
                    <thead>
                        <tr>
                            <th colSpan={8}>Portfolio</th>
                        </tr>
                        <tr className="ColName">
                            {columns.map((col, idx) => {
                                return <th key={col + idx}>{col}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.length !== 0 &&
                            portfolioData.map((data, idx) => {
                                return (
                                    <tr key={"portfolio_" + idx}>
                                        <td>{data.symbol}</td>
                                        <td>{data.companyName}</td>
                                        <td>{data.position}</td>
                                        <td>${data.averageCost}</td>
                                        <td>${data.marketValue}</td>
                                        <td>
                                            {parseFloat(
                                                data.marketValue /
                                                    portfolioValue
                                            ).toFixed(2) + "%"}
                                        </td>
                                        <td>
                                            ${data.todayReturn.raw}(
                                            {data.todayReturn.fmt}%)
                                        </td>
                                        <td>
                                            ${data.totalReturn.raw}(
                                            {data.totalReturn.fmt}%)
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
