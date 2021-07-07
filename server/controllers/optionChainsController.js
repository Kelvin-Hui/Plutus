const axios = require("axios");

exports.getOptionChains = async (req, res) => {
    try {
        const { symbol, date } = req.query;

        console.log(symbol);
        console.log(new Date(date * 1000).toLocaleDateString());

        const url = `https://query2.finance.yahoo.com/v7/finance/options/${symbol}`;

        const response = await axios({
            method: "get",
            url: url,
            timeout: 2000,
            params: { date: date },
        });

        return res.status(200).json({
            status: "success",
            data: response.data,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error,
        });
    }
};
