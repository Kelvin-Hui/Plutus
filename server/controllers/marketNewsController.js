const axios = require("axios");
const cheerio = require("cheerio");
const localRedis = require("../local-redis");

exports.getNews = async (req, res) => {
    try {
        const { symbol } = req.query;

        const yahoo_url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;

        //Redis Check Exchange
        const exchangeName = await new Promise((resolve) => {
            localRedis.get(`Exchange_${symbol}`, async (err, data) => {
                if (err) return null;
                if (data != null) {
                    resolve(data);
                } else {
                    try {
                        const result = await axios({
                            method: "get",
                            url: yahoo_url,
                            timeout: 5000,
                            params: {
                                modules: "price",
                            },
                        });
                        exchange_Name =
                            result.data.quoteSummary.result[0].price
                                .exchangeName;
                        exchange_Name = exchange_Name.replace("GS", "");
                        exchange_Name = exchange_Name.replace("GM", "");
                        exchange_Name = exchange_Name.replace(" ", "");

                        localRedis.SETEX(
                            `Exchange_${symbol}`,
                            31556952,
                            exchange_Name
                        );

                        resolve(exchange_Name);
                    } catch (error) {
                        return null;
                    }
                }
            });
        });

        const url = `https://www.google.com/finance/quote/${symbol}:${exchangeName}`;

        //Redis Get News
        localRedis.get(`News_${symbol}`, async (err, data) => {
            if (err) console.log(err);
            if (data != null) {
                return res.status(200).json({
                    status: "success",
                    data: JSON.parse(data),
                });
            } else {
                console.log(url);
                const response = await axios({
                    method: "get",
                    url: url,
                    timeout: 7000,
                });

                const $ = cheerio.load(response.data);
                const newsTable = $(".D6ciZd > .yY3Lee");
                let news = [];

                newsTable.each(function () {
                    const newsSource = $(this).find(".sfyJob").text();
                    const sourceTime = $(this).find(".Adak").text();
                    const newsTitle = $(this).find(".AoCdqe").text();

                    const newsLink = $(this).find("div> div>a").prop("href");

                    const newsThumbnail = $(this).find(".PgYz9d").prop("src");

                    news.push({
                        newsTitle: newsTitle,
                        newsSource: newsSource,
                        sourceTime: sourceTime,
                        newsLink: newsLink,
                        newsThumbnail: newsThumbnail,
                    });
                });
                if (news.length !== 0) {
                    localRedis.SETEX(
                        `News_${symbol}`,
                        3600,
                        JSON.stringify(news)
                    );
                    return res.status(200).json({
                        status: "success",
                        data: news,
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        data: news,
                    });
                }
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};
