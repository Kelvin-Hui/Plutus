const axios = require("axios");

function calcPeriod1() {
    let market = new Date();

    market.setUTCHours(13);
    market.setUTCMinutes(30);
    market.setUTCSeconds(0);
    market.setUTCMilliseconds(0);

    let d = new Date();
    let day = d.getDay();
    console.log(d.toLocaleString());
    console.log(day);

    if (day !== 0 && day !== 6) {
        console.log("WeekDay");
        if (d.valueOf() > market.valueOf()) {
            return market.valueOf() / 1000;
        } else {
            if (day === 1 && market.getDay() === 1) {
                return market.setDate(d.getDate() - 3).valueOf() / 1000;
            }
            return market.setDate(market.getDate() - 1).valueOf() / 1000;
        }
    } else {
        console.log("WeekEnd");
        if (day === 6) {
            console.log("Sat");
            return market.setDate(d.getDate() - 1).valueOf() / 1000;
        }
        if (day === 0) {
            console.log("Sun");
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
