import React from "react";
//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function LineChart({ transactions, portfolioValue }) {
    const ref = React.useRef();

    React.useEffect(() => {
        if (transactions.length !== 0) {
            transactions.push({ date: new Date(), pnl: 0 });
            reDrawChart();
        }

        var temp;

        window.addEventListener("resize", function () {
            clearTimeout(temp);
            temp = setTimeout(() => {
                reDrawChart();
            }, 500);
        });

        return window.removeEventListener("resize", function () {
            clearTimeout(temp);
            temp = setTimeout(() => {
                reDrawChart();
            }, 500);
        });
    });

    function reDrawChart() {
        const svg = d3.select(ref.current).select("#LineChart").remove();
        drawChart();
    }

    function drawChart() {
        var margin = { top: 40, bottom: 20, left: 60, right: 40 };

        // let width = ref.current.parentElement.offsetWidth * 0.9 - 100;
        // let height = ref.current.parentElement.offsetHeight * 0.9;

        let width = ref.current.parentElement.offsetWidth * 0.95 - 100;
        let height = ref.current.parentElement.offsetHeight * 0.85;

        var svg = d3
            .select(ref.current)
            .append("svg")
            .attr("id", "LineChart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        var x = d3
            .scaleTime()
            .domain(
                d3.extent(transactions, function (d) {
                    return new Date(d.date);
                })
            )
            .range([0, width]);

        const format = d3.timeFormat("%d/%m/%y %H:%M");

        var xAxis = d3
            .axisBottom(x)
            .tickFormat(function (d) {
                return format(d);
            })
            .ticks(4);

        var maxPNL = 0;
        var totalGain = 0;
        var totalLoss = 0;

        transactions.map((data) => {
            if (data.pnl > 0) {
                totalGain += data.pnl;
            } else {
                totalLoss += data.pnl;
            }
        });

        maxPNL = Math.max(totalGain, Math.abs(totalLoss));

        var y = d3
            .scaleLinear()
            .domain([
                25000 - Math.abs(maxPNL * 1.5),
                25000 + Math.abs(maxPNL * 1.5),
            ])
            .range([height, 0]);
        var yAxis = d3.axisLeft(y).tickFormat(function (d) {
            return "$" + d;
        });

        var xTick = svg
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${height})`);

        var yTick = svg.append("g").call(yAxis);

        yTick.selectAll(".tick text").attr("font-size", "0.9vw");
        yTick.selectAll(".tick line").attr("x2", width).attr("opacity", 0.1);
        xTick
            .selectAll(".tick text")
            .attr("font-size", "0.9vw")
            .attr("color", "gray");

        // var tempValue = 25000;

        // svg.append("path")
        //     .datum(transactions)
        //     .attr("fill", "none")
        //     .attr("stroke", totalGain + totalLoss >= 0 ? "#69b3a2" : "#FF0000")
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-width", 4)
        //     .attr(
        //         "d",
        //         d3
        //             .line()
        //             .x(function (d) {
        //                 return x(d.date);
        //             })
        //             .y(function (d) {
        //                 return y((tempValue += d.pnl));
        //             })
        //             .curve(d3.curveBasis)
        //     );

        svg.append("path")
            .datum(transactions)
            .attr("fill", "none")
            .attr("stroke", "#000000")
            .attr("stroke-width", 1)
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", "5,5")
            .attr(
                "d",
                d3
                    .line()
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        return y(25000);
                    })
                    .curve(d3.curveBasis)
            );

        var brush = d3
            .brushX()
            .extent([
                [0, 0],
                [width, height],
            ])
            .on("end", function (event, d) {
                return updateChart(event);
            });

        var line = svg.append("g").attr("clip-path", "url(#clip)");

        var tempValue = 25000;
        line.append("path")
            .datum(transactions)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr(
                "d",
                d3
                    .line()
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        return y(d.pnl);
                    })
            );

        line.append("g").attr("class", "brush").call(brush);

        var idleTimeout;
        function idled() {
            idleTimeout = null;
        }

        function updateChart(event) {
            console.log(event.selection);
            const extent = event.selection;

            if (!extent) {
                if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
                x.domain([4, 8]);
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                line.select(".brush").call(brush.move, null);

                xTick.transition().duration(1000).call(d3.axisBottom(x));

                var tempValue = 25000;
                line.select(".line")
                    .transition()
                    .duration(1000)
                    .attr(
                        "d",
                        d3
                            .line()
                            .x(function (d) {
                                return x(d.date);
                            })
                            .y(function (d) {
                                return y(tempValue + d.pnl);
                            })
                    );
            }
        }
    }

    return <div ref={ref} />;
}
