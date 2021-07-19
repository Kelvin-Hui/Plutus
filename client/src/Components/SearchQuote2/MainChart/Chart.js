import React from "react";
//Import scss
import "./MainChart.scss";

//Import clsx
import clsx from "clsx";

//Import d3JS for Stock Chart
import * as d3 from "d3";

//Import Axios for API calling
import axios from "axios";

export default function Chart({ previousClose, symbol }) {
    const ref = React.useRef();
    const [intervals, setIntervals] = React.useState("1m");
    const intervalOptions = [
        "1m",
        "5m",
        "15m",
        "30m",
        "1h",
        "1d",
        "1mo",
        "3mo",
    ];
    const upStroke = "#69b3a2";
    const upArea = "#cce5df";
    const downStroke = "#b55353";
    const downArea = "#e5cccc";

    React.useEffect(() => {
        const getChart = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/searchQuote/getChart?symbol=${symbol}&interval=${intervals}`
            );
            if (response.data.status !== "fail") {
                reDrawChart(response.data.data);
            } else {
                toggleSnackbar("Error", "Please Try Again!");
            }
        };

        if (previousClose) {
            getChart();
        }

        //reDrawChart(priceData);
    }, [previousClose, symbol, intervals]);

    function toggleSnackbar(status, msg) {
        var snack = document.getElementsByClassName("Snackbar")[0];

        snack.className = `Snackbar ${status} Show`;
        snack.textContent = msg;

        setTimeout(function () {
            snack.className = "Snackbar";
        }, 1900);
    }

    function reDrawChart(priceData) {
        d3.select(ref.current).select("#PriceChart").remove();
        drawChart(priceData);
    }

    function drawChart(priceData) {
        var margin = { top: 30, right: 50, bottom: 30, left: 50 };
        let intervalOptions = document.getElementById("intervalOptions");
        var width =
            ref.current.parentElement.offsetWidth * 0.95 -
            margin.left -
            margin.right;
        var height =
            (ref.current.parentElement.offsetHeight -
                intervalOptions.offsetHeight) *
            0.95;

        var svg = d3
            .select(ref.current)
            .append("svg")
            .attr("id", "PriceChart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .style("position", "relative");

        //Determine the color
        const color =
            priceData[0].close < priceData[priceData.length - 1].close
                ? [upArea, upStroke]
                : [downArea, downStroke];

        //x Range and Domain (For Other Interval other than 1m)
        // var x_not1m = d3
        //     .scaleTime()
        //     .domain(
        //         d3.extent(priceData, function (d) {
        //             return new Date(d.date);
        //         })
        //     )
        //     .range([0, width]);
        var allDates = priceData.map(function (data) {
            return new Date(data.date);
        });

        var x_not1m = d3.scaleBand().domain(allDates).range([0, width]);

        //x Range and Domain (For 1m)
        function marketClose(d) {
            //return 4pm EST of the Date Object
            d.setUTCHours(20);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            return d;
        }

        var x_1m = d3
            .scaleTime()
            .domain([
                new Date(priceData[0].date),
                marketClose(new Date(priceData[0].date)),
            ])
            .range([0, width]);

        var x = intervals === "1m" ? x_1m : x_not1m;

        //y Range and Domain
        var y = d3
            .scaleLinear()
            .domain([
                d3.min(priceData, function (d) {
                    if (d.low !== null) {
                        return d.low * 0.995;
                    }
                }),
                d3.max(priceData, function (d) {
                    if (d.high !== null) {
                        return d.high * 1.015;
                    }
                }),
            ])
            .range([height, 0]);

        //xAxis
        const dateFormat = d3.timeFormat("%m/%d");
        const hourFormat = d3.timeFormat("%H:%M");
        const dataLength = Math.round(x.domain().length / 10);

        console.log(dataLength);
        var xAxis = svg
            .append("g")
            .attr("class", "xAxis")
            .call(
                intervals === "1m"
                    ? d3.axisBottom(x).tickFormat(function (d) {
                          return hourFormat(d);
                      })
                    : d3
                          .axisBottom(x)
                          .tickFormat(function (d) {
                              return dateFormat(d);
                          })
                          .tickValues(
                              x.domain().filter(function (d, i) {
                                  return !(i % dataLength);
                              })
                          )
            )
            .attr("transform", `translate(0,${height})`);

        //yAxis
        var yAxis = svg
            .append("g")
            .attr("class", "yAxis")
            .call(
                d3
                    .axisLeft(y)
                    .tickFormat(function (d) {
                        return "$" + d;
                    })
                    .ticks(6)
            );

        //Modify Axis Label
        xAxis
            .selectAll(".tick text")
            .attr("fill", "gray")
            .attr("font-size", "calc(0.75rem + 0.15vw)");

        yAxis
            .selectAll(".tick text")
            .attr("fill", "gray")
            .attr("font-size", "calc(0.75rem + 0.15vw)");

        //Get Rid of yAxis path domain
        yAxis.select(".domain").style("display", "none");

        //Create Grid Line
        yAxis.selectAll(".tick line").attr("x2", width).attr("opacity", 0.1);

        //Add Area
        //Lowest Point
        const lowest = d3.min(priceData, function (d) {
            if (d.low !== null) {
                return d.low * 0.995;
            }
        });
        svg.append("path")
            .datum(
                priceData.filter(function (d) {
                    return d.close !== null;
                })
            )
            // .attr("fill", "#cce5df")
            // .attr("stroke", "#69b3a2")
            .attr("fill", color[0])
            .attr("stroke", color[1])
            .attr("stroke-width", 1.5)
            .attr(
                "d",
                d3
                    .area()

                    .x(function (d) {
                        return x(d.date);
                    })
                    .y0(y(lowest))
                    .y1(function (d) {
                        return y(d.close);
                    })
                    .curve(d3.curveMonotoneX)
            );

        //Add Previous Close
        // only for 1m
        {
            intervals === "1m" &&
                svg
                    .append("path")
                    .datum(priceData)
                    .attr("fill", "none")
                    .attr("stroke", "#000000")
                    .attr("stroke-width", 1)
                    .attr("stroke-linecap", "round")
                    .attr("stroke-dasharray", "10,10")
                    .attr(
                        "d",
                        d3
                            .line()
                            .x(function (d) {
                                return x(d.date);
                            })
                            .y(y(previousClose))
                    );
        }
    }

    return (
        <div className="ChartContainer" ref={ref}>
            <ul className="IntervalOptions" id="intervalOptions">
                {intervalOptions.map((i, idx) => (
                    <li
                        className={clsx({
                            Options: true,
                            Current: intervals === i,
                        })}
                        onClick={() => setIntervals(i)}
                        key={idx}
                    >
                        {i}
                    </li>
                ))}
            </ul>
        </div>
    );
}
