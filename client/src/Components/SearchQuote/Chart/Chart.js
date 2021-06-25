import React from "react";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";
//Import Axios for API calling
import axios from "axios";

//Import candleStickChart
import CandleStickChart from "./CandleStickChart";

export default function Chart({ symbol }) {
    console.log("Rendered Chart!");

    const pref = React.useRef();

    const [dim, setDim] = React.useState({});
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getChartData(symbol);
        setDim({
            width: pref.current.offsetWidth * 0.85,
            height: pref.current.offsetHeight,
        });
    }, [symbol]);

    function processData(data) {
        return data.timeStamp.map((time, idx) => ({
            date: new Date(time * 1000),
            high: data.high[idx],
            low: data.low[idx],
            open: data.open[idx],
            close: data.close[idx],
            volume: data.volume[idx],
        }));
    }

    function marketOpen() {
        const today = new Date();
        today.setUTCHours(13);
        today.setUTCMinutes(30);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);

        return today.valueOf() / 1000;
    }

    function getChartData(symbol) {
        const datetime = new Date();
        axios
            .get(
                `https://api.allorigins.win/get?url=https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?symbol=${symbol}&period1=${marketOpen()}&period2=9999999999&interval=1m,${datetime.valueOf()}`
            )
            .then((response) => JSON.parse(response.data.contents))
            .then((res) => res.chart.result[0])
            .then((result) => ({
                timeStamp: result.timestamp,
                open: result.indicators.quote[0].open,
                high: result.indicators.quote[0].high,
                low: result.indicators.quote[0].low,
                close: result.indicators.quote[0].close,
                volume: result.indicators.quote[0].volume,
            }))
            .then((d) => setData(processData(d)))
            .catch((err) => console.log(err + symbol));
    }

    return (
        <div className="Chart" ref={pref}>
            <Card>
                <CandleStickChart data={data} dim={dim} />
                {data[0] != undefined && data[0].open}
            </Card>
        </div>
    );
}
