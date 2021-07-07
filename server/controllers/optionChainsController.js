const axios = require("axios");

function processData(data) {
    var strikes = data.strikes;
    let cIdx = 0;
    const cOptions = data.options[0].calls;
    const cLen = data.options[0].calls.length;

    let pIdx = 0;
    const pOptions = data.options[0].puts;
    const pLen = data.options[0].puts.length;

    return strikes.map((s) => {
        return {
            strikes: s,
            calls:
                cIdx < cLen
                    ? cOptions[cIdx].strike === s
                        ? data.options[0].calls[cIdx++]
                        : null
                    : null,
            puts:
                pIdx < pLen
                    ? pOptions[pIdx].strike === s
                        ? data.options[0].puts[pIdx++]
                        : null
                    : null,
        };
    });
}

exports.getOptionChains = async (req, res) => {
    try {
        const { symbol, date, type } = req.query;
        const url = `https://query2.finance.yahoo.com/v7/finance/options/${symbol}`;

        const response = await axios({
            method: "get",
            url: url,
            timeout: 2000,
            params: { date: date },
        });

        const result = response.data.optionChain.result[0];

        const optionsData = processData(result);

        if (type === "exp") {
            return res.status(200).json({
                status: "success",
                data: {
                    exp: result.expirationDates[0],
                    expDates: result.expirationDates,
                    optionsData: optionsData,
                },
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: {
                    optionsData: optionsData,
                },
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};
