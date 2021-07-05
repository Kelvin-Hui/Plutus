const axios = require("axios");

exports.checkSymbol = async (req, res) => {
    try {
        const { symbol } = req.query;

        console.log("Checking Symbol : " + symbol);

        const response = await axios({
            method: "get",
            url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`,
            timeout: 1000,
            params: {
                modules: "summaryProfile",
            },
        });

        return res.status(200).json({
            status: "success",
            valid: true,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            valid: false,
            // error: error,
        });
    }
};
