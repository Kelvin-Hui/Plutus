import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import Axios for API calling
import axios from "axios";

export default function Portfolio({ balance, portfolio, unitPrice }) {
    const [portfolioData, setPortfolioData] = React.useState([]);
    let url = "http://localhost:5000/api/searchQuote/getPrice?symbols=";
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

    React.useEffect(() => {
        let data = [];
        const getPrice = async () => {
            Object.keys(portfolio).map((d, idx) => {
                url += `${d},`;
            });
            url = url.substring(0, url.length - 1);
            const res = await axios.get(url);
            let portfolioValue = balance;
            Object.keys(res.data.data).map((symbol) => {
                portfolioValue +=
                    res.data.data[symbol].currentPrice * portfolio[symbol];
            });

            Object.keys(res.data.data).map((symbol, idx) => {
                data.push({
                    symbol: symbol,
                    companyName: res.data.data[symbol].companyName,
                    position: portfolio[symbol],
                    averageCost: unitPrice[symbol],
                    marketValue:
                        Math.abs(portfolio[symbol]) *
                        res.data.data[symbol].currentPrice,
                    portfolioDiversity:
                        (Math.abs(portfolio[symbol]) *
                            res.data.data[symbol].currentPrice) /
                        portfolioValue,
                    todayReturn: 0,
                    totalReturn: {
                        raw:
                            res.data.data[symbol].currentPrice -
                            unitPrice[symbol],
                        fmt:
                            (res.data.data[symbol].currentPrice -
                                unitPrice[symbol]) /
                            unitPrice[symbol],
                    },
                });
            });
            setPortfolioData(
                data.sort((a, b) => b.portfolioDiversity - a.portfolioDiversity)
            );
        };
        getPrice();
    }, [balance]);

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
                                        <td>
                                            $
                                            {parseFloat(
                                                data.marketValue
                                            ).toFixed(2)}
                                        </td>
                                        <td>
                                            {parseFloat(
                                                data.portfolioDiversity
                                            ).toFixed(2) + "%"}
                                        </td>
                                        <td>{data.todayReturn}</td>
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
