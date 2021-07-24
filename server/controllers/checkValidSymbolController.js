const axios = require("axios");
const localRedis = require("../local-redis");

exports.checkSymbol = async (req, res) => {
    try {
        const { symbol } = req.query;

        //Redis
        localRedis.get(`Check_${symbol}`, async (err, data) => {
            //If Redis Error;
            if (err) {
                return res.status(200).json({
                    status: "fail",
                    error: err,
                });
            }
            //If Value Not Equal Null;
            if (data != null) {
                return res.status(200).json({
                    status: "success",
                    valid: JSON.parse(data),
                });
            }
            //If Key Not Found In Redis
            else {
                try {
                    const response = await axios({
                        method: "get",
                        url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`,
                        timeout: 1000,
                        params: {
                            modules: "summaryProfile",
                        },
                    });
                } catch (error) {
                    //If Fail Response;
                    return res.status(200).json({
                        status: "fail",
                        error: error,
                    });
                }
                //Store For 2 weeks (14 Days)
                localRedis.SETEX(`Check_${symbol}`, 1209600, true);
                return res.status(200).json({
                    status: "success",
                    valid: true,
                });
            }
        });

        // const response = await axios({
        //     method: "get",
        //     url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`,
        //     timeout: 1000,
        //     params: {
        //         modules: "summaryProfile",
        //     },
        // });

        // return res.status(200).json({
        //     status: "success",
        //     valid: true,
        // });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            valid: false,
        });
    }
};
