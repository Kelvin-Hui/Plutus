import React from "react";

//Import Axios for API calling
import axios from "axios";
//Import clsx
import clsx from "clsx";

function properDate(d) {
    return (
        d.getUTCMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
    );
}

export default function DataGrid({ symbol, data, exp }) {
    const [optionData, setOptionData] = React.useState(data);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:5000/api/optionChains?symbol=${symbol}&date=${exp}`
            );
            setOptionData(result.data.data.optionsData);
        };
        if (exp !== null) {
            fetchData();
        }
    }, [exp]);

    const columns = [
        "Open Interest",
        "Volume",
        "Implied Volatility",
        "Bid",
        "Ask",
        "Last",
        "% Change",
        "Strike",
        "% Change",
        "Last",
        "Bid",
        "Ask",
        "Implied Volatility",
        "Volume",
        "Open Interest",
    ];
    return (
        <table className="OptionsGrid">
            <thead>
                <tr className="GridTitle">
                    <th colSpan="15">{`${symbol}'s Option Chains ${properDate(
                        new Date(exp * 1000)
                    )}`}</th>
                </tr>

                <tr className="CALLPUT">
                    <th colSpan="7">Calls</th>
                    <th></th>
                    <th colSpan="7">Puts</th>
                </tr>
                <tr className="Row ColName">
                    {columns.map((col, idx) => {
                        return <th key={col + idx}>{col}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {Object.keys(optionData).length === 0 ? (
                    <td
                        colSpan="15"
                        style={{
                            height: "100vh",
                            verticalAlign: "sub",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        className="Skeleton"
                    >
                        Loading....
                    </td>
                ) : (
                    Object.keys(optionData).length != 0 &&
                    optionData.map((data, idx) => {
                        const c = data.calls != undefined ? data.calls : {};
                        const p = data.puts != undefined ? data.puts : {};

                        return (
                            <tr
                                className={clsx({
                                    Row: true,
                                    CallInTheMoney: c.inTheMoney,
                                    PutInTheMoney: p.inTheMoney,
                                })}
                                key={"data_" + idx}
                            >
                                <td>{c.openInterest || " - "}</td>
                                <td>{c.volume || " - "}</td>
                                <td>
                                    {parseFloat(
                                        c.impliedVolatility * 100
                                    ).toFixed(2) + "%" || " - "}
                                </td>
                                <td>{c.bid || " - "}</td>
                                <td>{c.ask || " - "}</td>
                                <td>{c.lastPrice || " - "}</td>
                                <td
                                    className={clsx({
                                        percentChange: true,
                                        up:
                                            parseFloat(c.percentChange).toFixed(
                                                2
                                            ) > 0,
                                        down:
                                            parseFloat(c.percentChange).toFixed(
                                                2
                                            ) < 0,
                                    })}
                                >
                                    {parseFloat(c.percentChange).toFixed(2) +
                                        "%" || " - "}
                                </td>
                                <td id={"strike_" + data.strikes}>
                                    <b>{data.strikes}</b>
                                </td>
                                <td
                                    className={clsx({
                                        percentChange: true,
                                        up:
                                            parseFloat(p.percentChange).toFixed(
                                                2
                                            ) > 0,
                                        down:
                                            parseFloat(p.percentChange).toFixed(
                                                2
                                            ) < 0,
                                    })}
                                >
                                    {parseFloat(p.percentChange).toFixed(2) +
                                        "%" || " - "}
                                </td>
                                <td>{p.lastPrice || " - "}</td>
                                <td>{p.bid || " - "}</td>
                                <td>{p.ask || " - "}</td>
                                <td>
                                    {parseFloat(
                                        p.impliedVolatility * 100
                                    ).toFixed(2) + "%" || " - "}
                                </td>
                                <td>{p.volume || " - "}</td>
                                <td>{p.openInterest || " - "}</td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}
