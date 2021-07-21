import React from "react";
import ReactDOM from "react-dom";

//Import scss
import "./OptionChains.scss";
//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";
//Import Axios for API calling
import axios from "axios";
//Import DataGrid
import DataGrid from "./DataGrid";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Snackbar from "../StyledComponents/Snackbar";

function properDate(d) {
    return (
        d.getUTCMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
    );
}

export default function OptionChains({ symbol }) {
    console.log("OC");
    //const [symbol, setSymbol] = React.useState("AAPL");
    const [exp, setExp] = React.useState(null);
    const [expirationDates, setExpirationDates] = React.useState([]);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:5000/api/optionChains?symbol=${symbol}&type=exp`
            );
            ReactDOM.unstable_batchedUpdates(() => {
                setExp(result.data.data.exp);
                setExpirationDates(result.data.data.expDates);
                setData(result.data.data.optionsData);
            });
        };
        fetchData();
    }, [symbol]);

    return (
        <div className="Contentpage">
            <Snackbar />
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                //setSymbol={setSymbol}
            />

            <Card id="OptionChainCard">
                <div className="OptionChainHeader">
                    <div className="Title">
                        {`${symbol}'s Option Chains ${properDate(
                            new Date(exp * 1000)
                        )}`}
                    </div>
                    <span>
                        Option's Exp Date
                        <select
                            value={exp === null ? "" : exp}
                            onChange={(e) => setExp(e.target.value)}
                        >
                            {expirationDates.length !== 0 &&
                                expirationDates.map((d, idx) => {
                                    var date = new Date(d * 1000);
                                    return (
                                        <option value={d} key={d + idx}>
                                            {properDate(date)}
                                        </option>
                                    );
                                })}
                        </select>{" "}
                    </span>
                </div>

                <DataGrid symbol={symbol} data={data} exp={exp} />
            </Card>
        </div>
    );
}
