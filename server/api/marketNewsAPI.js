const axios = require("axios");
const cheerio = require("cheerio");

exports.getNews = async (req, res) => {
    try {
        const { symbol } = req.query;

        //Check Exchange
        const yahoo_url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`;
        const result = await axios({
            method: "get",
            url: yahoo_url,
            timeout: 2000,
            params: {
                modules: "price",
            },
        });
        let exchangeName =
            result.data.quoteSummary.result[0].price.exchangeName;
        exchangeName = exchangeName.replace("GS", "");
        exchangeName = exchangeName.replace("GM", "");
        exchangeName = exchangeName.replace(" ", "");
        console.log(exchangeName);

        const url = `https://www.google.com/finance/quote/${symbol}:${exchangeName}`;

        const response = await axios({
            method: "get",
            url: url,
            timeout: 2000,
        });

        const $ = cheerio.load(response.data);
        const newsTable = $(".D6ciZd > div:not(:last)");
        const news = [];

        newsTable.each(function () {
            const newsSource = $(this)
                .find("div > div > a > div > div > div:first")
                .text();
            const sourceTime = $(this)
                .find("div > div > a > div > div > div:last")
                .text();

            const newsTitle = $(this)
                .find("div > div > a > div > div:last")
                .text();

            const newsLink = $(this).find("div> div>a").prop("href");

            const newsThumbnail = $(this).find(".PgYz9d").prop("src");

            news.push({
                newsTitle: newsTitle,
                newsSource: newsSource,
                sourceTime: sourceTime,
                newsLink: newsLink,
                newsThumbnail: newsThumbnail,
            });
            // console.log(newsSource + " : " + sourceTime);
            // console.log(newsTitle);
            // console.log(newsLink);
            // console.log("new img : " + newsThumbnail);
        });

        return res.status(200).json({
            status: "success",
            data: news,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error,
        });
    }
};
