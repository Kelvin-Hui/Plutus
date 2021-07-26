import React from "react";
//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function LineChart({ userInfo, transactions }) {
    const ref = React.useRef();

    React.useEffect(() => {
        if (transactions.length !== 0) {
            transactions.push({ date: new Date(), pnl: 0 });
        } else {
            transactions.push({ date: new Date(userInfo.joinDate), pnl: 0 });
            transactions.push({ date: new Date(), pnl: 0 });
        }
        var initalBalance = 25000;
        transactions.map((data, idx) => {
            data.currentBalance = initalBalance += data.pnl;
        });
        reDrawChart();

        var temp;

        window.addEventListener("resize", function () {
            clearTimeout(temp);
            temp = setTimeout(() => {
                reDrawChart();
            }, 500);
        });

        // document
        //     .getElementById("CollapsedBtn")
        //     .addEventListener("click", function () {
        //         clearTimeout(temp);
        //         temp = setTimeout(() => {
        //             reDrawChart();
        //         }, 500);
        //     });

        return window.removeEventListener("resize", function () {
            clearTimeout(temp);
            temp = setTimeout(() => {
                reDrawChart();
            }, 500);
        });
        // document
        //     .getElementById("CollapsedBtn")
        //     .removeEventListener("click", function () {
        //         clearTimeout(temp);
        //         temp = setTimeout(() => {
        //             reDrawChart();
        //         }, 500);
        //     })
    }, [transactions]);

    function reDrawChart() {
        d3.select(ref.current).select("#LineChart").remove();
        drawChart();
    }

    function drawChart() {
        var margin = { top: 10, bottom: 25, left: 70, right: 70 };

        let width =
            ref.current !== null
                ? ref.current.parentElement.offsetWidth * 0.95 -
                  margin.left -
                  margin.right
                : 1150;
        let height =
            ref.current !== null
                ? ref.current.parentElement.offsetHeight * 0.95
                : 400;

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

        const format = d3.timeFormat("%m/%d/%y %H:%M");
        const hourFormat = d3.timeFormat("%H:%M");
        var xAxis = d3
            .axisBottom(x)
            .tickFormat(function (d) {
                return format(d);
            })
            .ticks(4);

        var y = d3
            .scaleLinear()
            .domain(
                d3
                    .extent(transactions, function (d) {
                        return d.currentBalance;
                    })
                    .map((d, idx) => d * (0.999 + idx * 0.002))
            )
            .range([height, 0]);

        var yAxis = d3
            .axisLeft(y)
            .tickFormat(function (d) {
                return "$" + d;
            })
            .ticks(4);

        var xTick = svg
            .append("g")
            .attr("class", "xAxis")
            .call(xAxis)
            .attr("transform", `translate(0,${height})`);

        var yTick = svg.append("g").attr("class", "yAxis").call(yAxis);

        yTick.selectAll(".tick line").attr("x2", width).attr("opacity", 0.1);

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
            );

        //Brush Zoom

        var brush = d3
            .brushX()
            .extent([
                [0, 0],
                [width, height],
            ])
            .on("end", function (event, d) {
                return updateChart(event);
            });

        var clip = svg
            .append("defs")
            .append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        var line = svg.append("g").attr("clip-path", "url(#clip)");

        line.append("path")
            .datum(transactions)
            .attr("fill", "none")
            .attr("class", "line")
            .attr(
                "stroke",
                transactions[transactions.length - 1].currentBalance >= 0
                    ? "#69b3a2"
                    : "#FF0000"
            )
            .attr("stroke-width", 4)
            .attr("stroke-linecap", "round")
            .attr(
                "d",
                d3
                    .line()
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        return y(d.currentBalance);
                    })
                    .curve(d3.curveMonotoneX)
            );

        line.append("g").attr("class", "brush").call(brush);

        var idleTimeout;
        function idled() {
            idleTimeout = null;
        }

        function updateChart(event) {
            const extent = event.selection;

            if (!extent) {
                if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
                x.domain([4, 8]);
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])]);

                line.select(".brush").call(brush.move, null);

                xTick.transition().duration(1000).call(d3.axisBottom(x));

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
                                return y(d.currentBalance);
                            })
                            .curve(d3.curveMonotoneX)
                    );
            }
        }

        svg.on("dblclick", function () {
            x.domain(
                d3.extent(transactions, function (d) {
                    return new Date(d.date);
                })
            );

            xTick.transition().call(xAxis);

            line.select(".line")
                .transition()
                .attr(
                    "d",
                    d3
                        .line()
                        .x(function (d) {
                            return x(d.date);
                        })
                        .y(function (d) {
                            return y(d.currentBalance);
                        })
                        .curve(d3.curveMonotoneX)
                );
        });

        //Line Cursor
        var bisect = d3.bisector(function (d) {
            return d.date;
        }).left;

        var focus = svg
            .append("g")
            .attr("class", "foucs")
            .style("display", "none");
        focus
            .append("circle")
            .attr(
                "fill",
                transactions[transactions.length - 1].currentBalance >= 0
                    ? "#69b3a2"
                    : "#FF0000"
            )
            .attr("r", 5);
        focus
            .append("rect")
            .attr("class", "tooltip")
            .attr("width", 110)
            .attr("height", 75)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", "3")
            .attr("x", -50)
            .attr("y", -100)
            .attr("rx", 4)
            .attr("ry", 4);

        focus
            .append("text")
            .attr("class", "date")

            .attr("x", -35)
            .attr("y", -75);
        focus
            .append("text")
            .attr("class", "hour")
            .attr("x", -15)
            .attr("y", -55);
        focus
            .append("text")
            .attr("class", "balance")
            .attr("font-weight", "bold")
            .attr("x", -45)
            .attr("y", -35);

        function mouseover() {
            focus.style("display", "block");
        }
        function mouseout() {
            focus.style("display", "none");
        }

        function mousemove(event) {
            var x0 = x.invert(d3.pointer(event)[0]);
            var i = bisect(transactions, x0, 0);
            var selectedData = transactions[i];

            if (selectedData === undefined) {
                //pass
                return;
            }

            focus.attr(
                "transform",
                `translate(${x(selectedData.date)},${y(
                    selectedData.currentBalance
                )})`
            );

            focus.select(".date").text(selectedData.date.toLocaleDateString());
            focus.select(".hour").text(hourFormat(selectedData.date));
            focus
                .select(".balance")
                .text(
                    "$" +
                        Number(
                            selectedData.currentBalance.toFixed(2)
                        ).toLocaleString("en")
                );
        }

        svg.on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout);
    }

    return <div ref={ref} />;
}
