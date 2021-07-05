import React from "react";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";

//Import candleStickChart
import CandleStickChart from "./CandleStickChart";

export default function Chart({ symbol, ohlcData }) {
    console.log("Rendered Chart!");

    const pref = React.useRef();

    const [dim, setDim] = React.useState({});

    React.useEffect(() => {
        setDim({
            width: pref.current.offsetWidth * 0.85,
            height: pref.current.offsetHeight,
        });
    }, []);

    ohlcData = ohlcData.map((data) => ({
        ...data,
        date: new Date(data.date),
    }));

    return (
        <div className="Chart" ref={pref}>
            <Card H100={true}>
                {ohlcData.length === 0 ? (
                    <div
                        className="Skeleton"
                        style={{ height: "100%", width: "100%" }}
                    ></div>
                ) : (
                    <CandleStickChart data={ohlcData} dim={dim} />
                )}
            </Card>
        </div>
    );
}
