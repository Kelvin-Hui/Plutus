import React from "react";

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

function properDate(d) {
    return (
        d.getUTCMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
    );
}

export default function OptionChains() {
    const [symbol, setSymbol] = React.useState("AAPL");
    const [exp, setExp] = React.useState(null);
    const [expirationDates, setExpirationDates] = React.useState([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/api/optionChains?symbol=${symbol}`)
            .then((response) => response.data.data.optionChain.result[0])
            .then(
                (res) => (
                    setExp(res.expirationDates[0]),
                    setExpirationDates(res.expirationDates)
                )
            );
    }, [symbol]);

    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
                setExp={setExp}
            />

            <Card>
                <span>Option's Exp Date : </span>
                <select
                    value={exp === null ? expirationDates[0] : exp}
                    onChange={(e) => setExp(e.target.value)}
                >
                    {expirationDates.map((d, idx) => {
                        var date = new Date(d * 1000);
                        return (
                            <option value={d} key={d + idx}>
                                {properDate(date)}
                            </option>
                        );
                    })}
                </select>
                <DataGrid symbol={symbol} exp={exp} />
            </Card>
        </div>
    );
}
