import React from "react";
//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function LineChart({ transactions, portfolioValue }) {
    const ref = React.useRef();

    React.useEffect(() => {
        if (transactions.length !== 0) {
            reDrawChart();
        }
    });

    function reDrawChart() {
        const svg = d3.select(ref.current).select("#LineChart").remove();
        drawChart();
    }

    function drawChart() {
        var margin = { top: 20, bottom: 20, left: 50, right: 50 };
        let width = 600;
        let height = 210;

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

        var xAxis = d3.axisBottom(x);

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

        svg.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
        svg.append("g").call(yAxis);

        var tempValue = 25000;

        svg.append("path")
            .datum(transactions)
            .attr("fill", "none")
            .attr("class", "line")
            .attr("stroke", totalGain + totalLoss >= 0 ? "#69b3a2" : "#FF0000")
            .attr("stroke-width", 2.5)
            .attr(
                "d",
                d3
                    .line()
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        return y((tempValue += d.pnl));
                    })
                    .curve(d3.curveMonotoneX)
            );
    }

    return (
        <div ref={ref} className="LineChartContainer">
            {transactions.length === 0 && (
                <span className="EmptyData">Not Enough Data</span>
            )}
        </div>
    );
}
