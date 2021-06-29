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
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

            const response = await axios({
                method: "get",
                url: url,
                timeout: 2000,
                params: {
                    symbol: symbol,
                    period1: calcPeriod1(),
                    period2: 9999999999,
                    interval: "1m",
                },
            });
            return res.status(200).json({
                status: "success",
                data: response.data,
            });
        }
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error,
        });
    }
};
