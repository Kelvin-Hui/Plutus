import React from "react";
//Import scss
import "./MainChart.scss";

//Import Axios for API calling
import axios from "axios";

//Import d3JS for Stock Chart
import * as d3 from "d3";

export default function Earning({ symbol }) {
    const ref = React.useRef();

    React.useEffect(() => {
        const getEarning = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/searchQuote/getData?symbol=${symbol}&type=earning`
            );
            if (response.data.status !== "fail") {
                reDrawChart(response.data.data);
            }
        };

        getEarning();
    }, []);

    function reDrawChart(data) {
        d3.select(ref.current).select("#EarningChart").remove();
        drawEarningChart(data);
    }

    function drawEarningChart(data) {
        var margin = { top: 30, right: 70, bottom: 40, left: 70 };
        var width =
            ref.current.parentElement.offsetWidth * 0.95 -
            margin.left -
            margin.right;

        var height = ref.current.parentElement.offsetHeight * 0.9;

        var svg = d3
            .select(ref.current)
            .append("svg")
            .attr("id", "EarningChart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .style("position", "relative");

        //Need to format data first;
        let earningChartData = data.earningsChart.quarterly;
        earningChartData.push({
            date:
                data.earningsChart.currentQuarterEstimateDate +
                data.earningsChart.currentQuarterEstimateYear,
            estimate: data.earningsChart.currentQuarterEstimate,
            earningsDate: data.earningsChart.earningsDate[0],
        });

        // X Range and Domain
        var x = d3
            .scaleBand()
            .domain(
                earningChartData.map(function (d) {
                    return d.date;
                })
            )
            .range([0, width])
            .padding(1);

        var xAxis = svg
            .append("g")
            .attr("class", "xAxis")
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0,${height})`);

        // Y Range and Domain
        // get actual and estimated eps together;
        let eps = [];
        earningChartData.map((d) => {
            if (d.actual !== undefined) eps.push(d.actual.raw);
            eps.push(d.estimate.raw);
        });

        let ydomain = d3.extent(eps);
        ydomain[0] = ydomain[0] < 0 ? ydomain[0] - 0.1 : ydomain[0] * 0.9;
        ydomain[1] = ydomain[1] * 1.1;

        var y = d3.scaleLinear().domain(ydomain).range([height, 0]);
        var yAxis = svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y));

        xAxis
            .selectAll(".tick text")
            .attr("fill", "gray")
            .attr("font-size", "calc(0.6rem + 0.15vw)");

        //Add new line to xAxis
        function beat_miss(date) {
            const data = earningChartData.find((el) => el.date == date);
            if (!data) return "";
            if (!data.actual) return [" TBD ", "black"];
            return data.actual.raw > data.estimate.raw
                ? ["Beat", "green"]
                : ["Miss", "red"];
        }

        var insert = function () {
            var el = d3.select(this);

            let result = beat_miss(el.data());

            var tspan = el
                .append("tspan")
                .text(result[0])
                .attr("fill", result[1]);
            tspan.attr("x", 0).attr("dy", 15);
        };
        xAxis.selectAll(".tick text").each(insert);

        yAxis
            .selectAll(".tick text")
            .attr("fill", "gray")
            .attr("font-size", "calc(0.7rem + 0.15vw)");

        //Create Grid Line
        yAxis.selectAll(".tick line").attr("x2", width).attr("opacity", 0.15);

        //Get Rid of xAxis&yAxis path domain
        xAxis.select(".domain").style("display", "none");
        yAxis.select(".domain").style("display", "none");

        //setColor
        const colorEstimate = "#536db5";
        const colorBeats = "#69b3a2";
        const colorMiss = "#b55353";

        //Created Tooltips

        var focus = svg
            .append("g")
            .attr("class", "foucs")
            .style("display", "none");

        focus
            .append("rect")
            .attr("class", "tooltip")
            .attr("width", 100)
            .attr("height", 60)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", "3");
        focus
            .append("text")
            .attr("class", "EPS")
            .text("estimate")
            .attr("font-weight", "bold")
            .attr("x", 20)
            .attr("y", 17.5);

        focus
            .append("text")
            .text("EPS")
            .attr("font-weight", "bold")
            .attr("x", 37.5)
            .attr("y", 35);
        focus
            .append("text")
            .attr("class", "Value")
            .text(0.44)
            .attr("font-weight", "bold")
            .attr("x", 35)
            .attr("y", 52.5);

        function mouseout() {
            focus.style("display", "none");
            focus.style("fill", "black");
        }

        //Adding Dots Actual;
        svg.selectAll("dot.Actual")
            .data(
                earningChartData.filter(function (d) {
                    return d.actual !== undefined;
                })
            )
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.actual.raw);
            })
            .attr("r", 10)
            .style("fill", function (d) {
                return d.actual.raw > d.estimate.raw ? colorBeats : colorMiss;
            })
            .on("mouseover", function mouseover() {
                var data = d3.select(this).data()[0];

                focus.attr(
                    "transform",
                    `translate(${x(data.date) * 1.05},${y(data.actual.raw)})`
                );
                focus
                    .style("display", "block")
                    .style(
                        "fill",
                        data.actual.raw > data.estimate.raw
                            ? colorBeats
                            : colorMiss
                    );
                focus.select(".EPS").text("Actual");
                focus.select(".Value").text(data.actual.raw);
            })
            .on("mouseout", mouseout);

        //Adding Dots Estimate;
        svg.selectAll("dot.Estimate")
            .data(earningChartData)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.estimate.raw);
            })
            .attr("r", 10)
            .style("fill", "gray")
            .on("mouseover", function mouseover() {
                var data = d3.select(this).data()[0];

                focus.attr(
                    "transform",
                    `translate(${x(data.date) * 1.05},${y(data.estimate.raw)})`
                );
                focus.style("display", "block");

                focus.select(".EPS").text("Estimate");
                focus.select(".Value").text(data.estimate.raw);
            })
            .on("mouseout", mouseout);
    }
    return <div className="EarningChart" ref={ref}></div>;
}
