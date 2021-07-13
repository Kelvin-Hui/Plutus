import React from "react";
//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function PieChart({ pieChartData, portfolioValue }) {
    const ref = React.useRef();

    React.useEffect(() => {
        {
            pieChartData.length !== 0 && reDrawChart();
        }
    });

    function reDrawChart() {
        const svg = d3.select(ref.current).select("#DonutChart").remove();
        drawChart();
    }

    function drawChart() {
        var data = [];

        Object.keys(pieChartData).map((k, idx) => {
            data.push({
                key: k,
                value: pieChartData[k],
            });
        });

        let width = 200;
        let height = 200;
        let margin = 20;

        var radius = Math.min(width, height) / 2 - margin;

        var color = d3.scaleOrdinal(d3.schemeSet3);
        console.log(d3.schemeSet3);

        var svg = d3
            .select(ref.current)
            .append("svg")
            .attr("id", "DonutChart")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        var pie = d3.pie().value(function (d) {
            return d.value;
        });

        svg.selectAll("pieLine")
            .data(pie(data))
            .enter()
            .append("path")
            .attr(
                "d",
                d3.arc().innerRadius(100).outerRadius(radius).cornerRadius(5)
            )
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")

            .on("mouseover", function (d, i) {
                var data = d3.select(this).data()[0].data;

                d3.select("#text1").text(data.key);
                d3.select("#text2").text(
                    "$" + (portfolioValue * data.value).toFixed(2)
                );
                d3.select("#text3").text((data.value * 100).toFixed(2) + "%");
                d3.select(this).transition().duration(50).attr("opacity", 0.75);
            })
            .on("mouseout", function (d, i) {
                d3.select("#text1").text("Portfolio Value");
                d3.select("#text2").text("");
                d3.select("#text3").text("$" + portfolioValue.toFixed(2));
                d3.select(this).transition().duration(50).attr("opacity", 1);
            });
        svg.append("text")
            .attr("id", "text1")
            .attr("text-anchor", "middle")
            .attr("font-size", "1.15em")
            .attr("font-weight", "bold")
            .attr("dy", "-1.5em")
            .text("Portfolio Value");
        svg.append("text")
            .attr("id", "text2")
            .attr("text-anchor", "middle")
            .attr("font-size", "1em");
        svg.append("text")
            .attr("id", "text3")
            .attr("text-anchor", "middle")
            .attr("font-size", "1em")
            .attr("dy", "2em")
            .text("$" + portfolioValue.toFixed(2));
    }

    return <div className="PieChartContainer" ref={ref} />;
}
