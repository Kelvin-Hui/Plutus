import React from "react";

//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function CandleStickChart({ data, dim }) {
    const ref = React.useRef();

    React.useEffect(() => {
        {
            data.length != 0 && reDrawChart();
        }
    }, [data]);

    function reDrawChart() {
        const svg = d3
            .select(ref.current)
            .select("#CandleStickChartSvg")
            .remove();
        drawChart();
    }
    function drawChart() {
        var margin = { top: 30, right: 50, bottom: 30, left: 50 };
        // var width = ref.current.parentElement.offsetWidth;
        // var height = ref.current.parentElement.offsetHeight;
        var width = dim.width;
        var height = 500 || dim.height;

        var svg = d3.select(ref.current).append("svg");

        svg.attr("width", width)
            .attr("id", "CandleStickChartSvg")
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
                }) - 0.05,
                d3.max(data, (d) => {
                    return d.high;
                }) + 0.05,
            ])
            .range([height - margin.bottom, 0 + margin.top]);
        var yAxis = d3.axisLeft().scale(y);
        var xAxis = d3.axisBottom().scale(x);

        svg.append("g")
            .call(xAxis)
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${height - margin.bottom})`);
        svg.append("g")
            .call(yAxis)
            .attr("class", "yAxis")
            .attr("transform", `translate(${margin.left},0)`);

        svg.selectAll("rect.OC")
            .data(data)
            .enter()
            .append("svg:rect")
            .attr("class", "OC")
            .attr("key", function (d) {
                return "OC" + d.date.valueOf();
            })
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

        svg.selectAll("line.LH")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "LH")
            .attr("key", function (d) {
                return "LH" + d.date.valueOf();
            })
            .attr("x1", function (d) {
                return (
                    x(d.date) + (0.25 * (width - 2 * margin.left)) / data.length
                );
            })
            .attr("x2", function (d) {
                return (
                    x(d.date) + (0.25 * (width - 2 * margin.left)) / data.length
                );
            })
            .attr("y1", function (d) {
                return y(d.high);
            })
            .attr("y2", function (d) {
                return y(d.low);
            });
    }
    return <div ref={ref} />;
}
