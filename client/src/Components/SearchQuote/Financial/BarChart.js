import React from "react";

//Import d3JS for Stock Chart
import * as d3 from "d3";
import { schemeGnBu } from "d3";

export default function BarChart({ data }) {
    const ref = React.useRef();

    React.useEffect(() => {
        {
            data.length != 0 && reDrawChart();
        }
    }, [data]);

    function reDrawChart() {
        const svg = d3.select(ref.current).select("#BarChartSvg").remove();
        drawChart();
    }

    function drawChart() {
        var margin = { top: 30, right: 50, bottom: 30, left: 50 };
        var width = 500;
        var height = 500;
        var svg = d3.select(ref.current).append("svg");
        svg.attr("width", width)
            .attr("height", height)
            .attr("id", "BarChartSvg");
        console.log(data);

        var x = d3
            .scaleBand()
            .domain(data.map((d) => d.date.fmt))
            .range([0 + margin.left, width - margin.right]);

        var y = d3
            .scaleLinear()
            .domain([
                d3.min(data, (d) => {
                    return d.netIncome.raw;
                }) - 1000000000,
                d3.max(data, (d) => {
                    return d.totalRevenue.raw;
                }) + 1000000000,
            ])
            .range([height - margin.bottom, 0 + margin.top]);
        console.log(
            d3.min(data, (d) => {
                return d.netIncome.raw;
            })
        );
        var yAxis = d3
            .axisLeft()
            .scale(y)
            .tickFormat((d) => `${d / 1000000000}B`);
        var xAxis = d3.axisBottom().scale(x);

        var yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat("").ticks(8);

        var negativeValue =
            d3.min(data, (d) => {
                return d.netIncome.raw;
            }) < 0;

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${height - margin.bottom})`);
        svg.append("g")
            .call(yAxis)
            .attr("class", "yAxis")
            .attr("transform", `translate(${margin.left},0)`);

        svg.append("g")
            .attr("class", "y axis-grid")
            .attr("color", "lightgrey")
            .call(yAxisGrid)
            .attr("transform", `translate(${margin.left},0)`);

        svg.selectAll("rect.Revenue")
            .data(data)
            .enter()
            .append("svg:rect")
            .attr("x", function (d) {
                return x(d.date.fmt) + margin.right / 2;
            })
            .attr("y", function (d) {
                return y(d.totalRevenue.raw);
            })
            .attr("height", function (d) {
                return negativeValue
                    ? y(0) - y(d.totalRevenue.raw)
                    : height - y(d.totalRevenue.raw) - margin.bottom;
            })
            .attr("width", margin.left / 2)
            .attr("fill", "green");

        svg.selectAll("rect.Income")
            .data(data)
            .enter()
            .append("svg:rect")
            .attr("x", function (d) {
                return x(d.date.fmt) + margin.right;
            })
            .attr("y", function (d) {
                return d.netIncome.raw < 0 ? y(0) : y(d.netIncome.raw);
            })
            .attr("height", function (d) {
                return negativeValue
                    ? d.netIncome.raw < 0
                        ? height - margin.bottom - y(0)
                        : y(0) - y(d.netIncome.raw)
                    : height - y(d.netIncome.raw) - margin.bottom;
            })
            .attr("width", margin.right / 2)
            .attr("fill", "blue");
    }

    return <div ref={ref} />;
}
