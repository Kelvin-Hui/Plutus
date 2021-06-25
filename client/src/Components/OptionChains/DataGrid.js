import React from "react";

//Import Axios for API calling
import axios from "axios";
//Import clsx
import clsx from "clsx";

export default function DataGrid({ symbol, exp }) {
    const [options, setOptions] = React.useState({});

    function processData(data) {
        var strikes = data.strikes;

        let cIdx = 0;
        const coptions = data.options[0].calls;
        const cLen = data.options[0].calls.length;

        let pIdx = 0;
        const poptions = data.options[0].puts;
        const pLen = data.options[0].puts.length;

        return strikes.map((s, idx) => {
            return {
                strikes: s,
                calls:
                    cIdx < cLen
                        ? coptions[cIdx].strike === s
                            ? data.options[0].calls[cIdx++]
                            : null
                        : null,
                puts:
                    pIdx < pLen
                        ? poptions[pIdx].strike === s
                            ? data.options[0].puts[pIdx++]
                            : null
                        : null,
            };
        });
    }

    React.useEffect(() => {
        {
            exp != null &&
                axios
                    .get(
                        `http://localhost:5000/api/optionChains?symbol=${symbol}&date=${exp}`
                    )
                    .then(
                        (response) => response.data.data.optionChain.result[0]
                    )
                    .then(
                        (res) => (
                            setOptions(processData(res)), console.log(res)
                        )
                    );
        }
    }, [symbol, exp]);

    const columns = [
        "Volume",
        "Implied Volatility",
        "Bid",
        "Ask",
        "Last",
        "Strike",
        "Last",
        "Bid",
        "Ask",
        "Implied Volatility",
        "Volume",
    ];
    return (
        <table className="OptionsGrid">
            <thead>
                <tr>
                    <th colSpan="11">{`${symbol}'s Option Chains ${new Date(
                        exp * 1000
                    ).toLocaleDateString()}`}</th>
                </tr>

                <tr className="CALLPUT">
                    <th colSpan="5">Calls</th>
                    <th></th>
                    <th colSpan="5">Puts</th>
                </tr>
                <tr className="Row">
                    {columns.map((col, idx) => {
                        return <th key={col + idx}>{col}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {Object.keys(options).length != 0 &&
                    options.map((data, idx) => {
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
                                <td>{c.volume || " - "}</td>
                                <td>
                                    {parseFloat(
                                        c.impliedVolatility * 100
                                    ).toFixed(2) + "%" || " - "}
                                </td>
                                <td>{c.bid || " - "}</td>
                                <td>{c.ask || " - "}</td>
                                <td>{c.lastPrice || " - "}</td>
                                <td id={"strike_" + data.strikes}>
                                    <b>{data.strikes}</b>
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
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
