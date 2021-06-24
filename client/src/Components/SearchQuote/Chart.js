import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import Axios for API calling
import axios from "axios";
//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function Chart({ symbol }) {
    console.log("Rendered Chart!");
    const ref = React.useRef();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getChartData(symbol);
    }, []);
    if (data != 0) {
        drawChart();
    }

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

    function drawChart() {
        var margin = { top: 20, right: 50, bottom: 30, left: 50 };
        var width = 960;
        var height = 500;

        var svg = d3.select(ref.current);
        svg.attr("width", width + 100)
            .attr("height", height)
            .attr("border", "1px black solid");

        var x = d3
            .scaleTime()
            .domain([
                new Date(
                    d3.min(data, (d) => {
                        return d.date;
                    }) - 300000
                ),
                new Date(
                    d3.max(data, (d) => {
                        return d.date;
                    })
                ),
            ])
            .range([0 + margin.left, width - margin.right]);

        var y = d3
            .scaleLinear()
            .domain([
                d3.min(data, (d) => {
                    return d.low;
                }) - 0.5,
                d3.max(data, (d) => {
                    return d.high;
                }) + 0.5,
            ])
            .range([height - margin.bottom, 0 + margin.top]);

        var yAxis = d3.axisLeft().scale(y);
        var xAxis = d3.axisBottom().scale(x);

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${height - margin.bottom})`);
        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(${margin.left},0)`);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("svg:rect")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("y", function (d) {
                return y(Math.max(d.open, d.close));
            })
            .attr("height", function (d) {
                return (
                    y(Math.min(d.open, d.close)) - y(Math.max(d.open, d.close))
                );
            })
            .attr("width", function (d) {
                return (0.5 * (width - 2 * margin.left)) / data.length;
            })
            .attr("fill", function (d) {
                return d.open > d.close ? "red" : "green";
            });
        // svg.selectAll("line")
        //     .data(data)
        //     .enter()
        //     .append("line")
        //     .attr("stroke", "black")
        //     .attr("transform", `translate(${margin.left},0)`)
        //     .attr("x1", function (d) {
        //         return x(d.date) - 2 * margin.right;
        //     })
        //     .attr("x2", function (d) {
        //         return x(d.date) - 2 * margin.right;
        //     })
        //     .attr("y1", function (d) {
        //         return y(d.high);
        //     })
        //     .attr("y2", function (d) {
        //         return y(d.low);
        //     });
    }

    return (
        <div className="Chart">
            <Card>
                <svg ref={ref} />
                {data[0] != undefined && data[0].open}
            </Card>
        </div>
    );
}
