const axios = require("axios");

function calcPeriod1() {
    let d = new Date();

    d.setUTCHours(13);
    d.setUTCMinutes(30);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);

    if (new Date().valueOf() > d.valueOf()) {
        return d.valueOf() / 1000;
    } else {
        return d.setDate(d.getDate() - 1).valueOf() / 1000;
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
                        currentPrice:
                            result.price.regularMarketPrice.raw || null,
                        percent:
                            result.price.regularMarketChangePercent || null,

                        tags: [
                            result.summaryProfile.sector || null,
                            result.summaryProfile.industry || null,
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
        return res.status(200).json({
            status: "fail",
            error: error,
        });
    }
};
