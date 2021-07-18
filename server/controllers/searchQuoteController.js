const axios = require("axios");

function calcPeriod1() {
    //market open time 930am EST for today;
    let market = new Date();
    market.setUTCHours(13);
    market.setUTCMinutes(30);
    market.setUTCSeconds(0);
    market.setUTCMilliseconds(0);

    //get todays's day 0 - 6 (Sun-Sat);
    let d = new Date();
    let day = d.getDay();
    console.log(d.toLocaleString());
    console.log(day);

    //If today is normal weekday;
    if (day !== 0 && day !== 6) {
        console.log("WeekDay");
        //If Time now > Market Open Time
        //Return 930AM EST Today;
        if (d.valueOf() > market.valueOf()) {
            return market.valueOf() / 1000;
        }
        //Else Time now < Market Open Time
        else {
            //If Today is Monday
            //Return Last Friday's Market Open Time
            if (day === 1 && market.getDay() === 1) {
                return market.setDate(d.getDate() - 3).valueOf() / 1000;
            }
            //Return Previous Day Market Open Time
            return market.setDate(market.getDate() - 1).valueOf() / 1000;
        }
    }

    //If today is normal weekend;
    else {
        console.log("WeekEnd");
        if (day === 6) {
            console.log("Sat");
            //Get Friday's Time;
            return market.setDate(d.getDate() - 1).valueOf() / 1000;
        }
        if (day === 0) {
            console.log("Sun");
            //Get Friday's Time;
            return market.setDate(d.getDate() - 2).valueOf() / 1000;
        }
    }
}

exports.getQuote = async (req, res) => {
    try {
        const { symbol, type } = req.query;

        if (type == "Chart") {
            const url_chart = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`;
            const url_kS = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;

            const response_chart = await axios({
                method: "get",
                url: url_chart,
                timeout: 2000,
                params: {
                    symbol: symbol,
                    period1: calcPeriod1(),
                    period2: 9999999999,
                    interval: "1m",
                },
            });

            const response_kS = await axios({
                method: "get",
                url: url_kS,
                timeout: 2000,
                params: {
                    modules: "summaryDetail",
                },
            });

            const result_chart = response_chart.data.chart.result[0];
            const result_kS =
                response_kS.data.quoteSummary.result[0].summaryDetail;

            return res.status(200).json({
                status: "success",
                data: {
                    ohlcData:
                        result_chart.timestamp === undefined
                            ? []
                            : result_chart.timestamp.map((time, idx) => ({
                                  date: time * 1000,
                                  high: result_chart.indicators.quote[0].high[
                                      idx
                                  ],
                                  low: result_chart.indicators.quote[0].low[
                                      idx
                                  ],
                                  open: result_chart.indicators.quote[0].open[
                                      idx
                                  ],
                                  close: result_chart.indicators.quote[0].close[
                                      idx
                                  ],
                                  volume: result_chart.indicators.quote[0]
                                      .volume[idx],
                              })),
                    summaryDetail: {
                        askRange:
                            result_kS.ask.raw + " x " + result_kS.askSize.raw,
                        bidRange:
                            result_kS.bid.raw + " x " + result_kS.bidSize.raw,
                        prevClose: result_kS.previousClose.raw,
                        open: result_kS.open.raw,
                        dayRange:
                            result_kS.dayLow.raw +
                            " - " +
                            result_kS.dayHigh.raw,
                        fiftyTwoWeekRange:
                            result_kS.fiftyTwoWeekLow.raw +
                            " - " +
                            result_kS.fiftyTwoWeekHigh.raw,

                        volume: result_kS.volume.longFmt,
                        avgVolume: result_kS.averageVolume.longFmt,
                        fiftyMA: result_kS.fiftyDayAverage.raw,
                        twoHundredMA: result_kS.twoHundredDayAverage.raw,
                    },
                },
            });
        } else if (type == "Summary") {
            const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;

            const response = await axios({
                method: "get",
                url: url,
                timeout: 2000,
                params: {
                    modules: "incomeStatementHistory,price,summaryProfile",
                },
            });
            const result = response.data.quoteSummary.result[0];

            return res.status(200).json({
                status: "success",
                data: {
                    companyInfo: {
                        companyName: result.price.longName || null,
                        companySymbol: result.price.symbol || null,
                        currentPrice:
                            result.price.regularMarketPrice.raw || null,
                        percent:
                            result.price.regularMarketChangePercent || null,

                        tags:
                            result.summaryProfile.sector === undefined
                                ? []
                                : [
                                      result.summaryProfile.sector,
                                      result.summaryProfile.industry,
                                  ],

                        businessSummary:
                            result.summaryProfile.longBusinessSummary || null,
                        website: result.summaryProfile.website || null,
                    },
                    incomeRevenueYearly:
                        result.incomeStatementHistory === undefined
                            ? []
                            : result.incomeStatementHistory.incomeStatementHistory
                                  .reverse()
                                  .map((d) => ({
                                      date: d.endDate,
                                      netIncome: d.netIncome,
                                      totalRevenue: d.totalRevenue,
                                  })),
                },
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};

exports.getChart = async (req, res) => {
    try {
        let { symbol, interval } = req.query;
        if (!symbol) {
            return res.status(200).json({
                status: "fail",
                message: "Missing Symbol!",
                data: {},
            });
        }
        if (!interval) {
            interval = "1m";
        }

        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`;
        const response = await axios({
            method: "get",
            url: url,
            timeout: 2000,
            params: {
                symbol: symbol,
                period1: interval === "1m" ? calcPeriod1() : null,
                period2: 9999999999,
                interval: interval,
                includePrePost: interval === "1m" ? false : true,
            },
        });

        if (!response) {
            return res.status(200).json({
                status: "fail",
                message: "Fail Response!",
                data: [],
            });
        }

        const result = response.data.chart.result[0];
        const quote = result.indicators.quote[0];
        const ohlcData = result.timestamp.map((time, idx) => ({
            // humanDate: new Date(time * 1000).toLocaleString(),
            date: time * 1000,
            open: quote.open[idx],
            high: quote.high[idx],
            low: quote.low[idx],
            close: quote.close[idx],
            volume: quote.volume[idx],
        }));

        return res.status(200).json({
            status: "success",
            data: ohlcData,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.getInfo = async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(200).json({
                status: "fail",
                message: "Missing Symbol!",
                data: {},
            });
        }
        const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;
        const response = await axios({
            method: "get",
            url: url,
            timeout: 3000,
            params: {
                modules: "price,summaryProfile,summaryDetail",
            },
        });
        if (!response) {
            return res.status(200).json({
                status: "fail",
                message: "Fail Response!",
                data: {},
            });
        }
        const priceResult = response.data.quoteSummary.result[0].price || [];
        const summaryProfileResult =
            response.data.quoteSummary.result[0].summaryProfile || [];
        const summaryDetailResult =
            response.data.quoteSummary.result[0].summaryDetail || [];

        let stockInfo =
            priceResult !== [] && summaryProfileResult !== []
                ? {
                      name: priceResult.shortName,
                      website: summaryProfileResult.website,
                      symbol: symbol,
                      exchangeName: priceResult.exchangeName.toUpperCase(),
                      sector: summaryProfileResult.sector || null,
                      industry: summaryProfileResult.industry || null,
                      lastPrice: priceResult.regularMarketPrice.raw.toFixed(2),
                      currency: priceResult.currency,
                      priceChange: priceResult.regularMarketChange.fmt,
                      priceChangePercent:
                          priceResult.regularMarketChangePercent.fmt,
                      color:
                          priceResult.regularMarketChange.raw > 0
                              ? "00FF00"
                              : "#FF0000",
                  }
                : {};

        let keyData =
            summaryDetailResult !== []
                ? {
                      previousClose:
                          summaryDetailResult.previousClose.raw.toFixed(2),
                      open: summaryDetailResult.open.raw.toFixed(2),
                      high: summaryDetailResult.dayHigh.raw.toFixed(2),
                      low: summaryDetailResult.dayLow.raw.toFixed(2),
                      close: priceResult.regularMarketPrice.raw.toFixed(2),
                  }
                : {};

        return res.status(200).json({
            status: "success",
            data: { stockInfo: stockInfo, keyData: keyData },
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};

//Create an object that map type into modules params
const type_modules = {
    overview: "assetProfile",
    revenue: "earnings",
    earning: "earnings",
};
function extractData(data, type) {
    if (data === undefined) {
        return {};
    } else {
        switch (type) {
            case "overview":
                return {
                    summary: data.longBusinessSummary,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    employees: data.fullTimeEmployees,
                    ceoName: data.companyOfficers[0].name,
                    ceoTitle: data.companyOfficers[0].title,
                };
            case "revenue":
                return {
                    financialsChart: data.financialsChart,
                };

            case "earning":
                return {
                    earningsChart: data.earningsChart,
                };

            case "financial":
                return {};

            default:
                return {};
        }
    }
}
exports.getData = async (req, res) => {
    try {
        const { symbol, type } = req.query;
        if (!symbol) {
            return res.status(200).json({
                status: "fail",
                message: "Missing Symbol!",
            });
        }
        if (!type) {
            return res.status(200).json({
                status: "fail",
                message: "Missing Parameter",
            });
        }
        const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;

        const response = await axios({
            method: "get",
            url: url,
            timeout: 3000,
            params: {
                modules: type_modules[type],
            },
        });

        if (!response) {
            return res.status(200).json({
                status: "fail",
                message: "Fail Response!",
            });
        }

        const result = response.data.quoteSummary.result[0][type_modules[type]];

        return res.status(200).json({
            status: "success",
            data: extractData(result, type),
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};
