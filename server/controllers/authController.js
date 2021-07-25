let User = require("../models/userModel");
let UserPortfolio = require("../models/userPortfolioModel");

const localRedis = require("../local-redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.createAccount = async (req, res) => {
    console.log("called create account");
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({
                status: "fail",
                message: "Credentials Missing !!!",
            });
        }

        if (username.length < 4 || username.length > 16) {
            return res.status(200).json({
                status: "fail",
                message: "Username must be between 4 - 16 Character !!!  ",
            });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(200).json({
                status: "fail",
                message: "Username already exists :(",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        newUser
            .save()
            .then(
                () => (
                    new UserPortfolio({
                        username: username,
                        userID: newUser._id,
                    }).save(),
                    res.status(201).json({
                        status: "scuccess",
                        message: "User Created : " + username + " !",
                    })
                )
            )
            .catch((err) =>
                res.status(400).json({ status: "fail", message: err.message })
            );
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

exports.loginAccount = async (req, res) => {
    console.log("called login account");
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                status: "fail",
                message: "Credentials Missing !!!",
            });
        }
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            console.log("username doesn't exist!");
            return res.status(200).json({
                status: "fail",
                message: "Invalid Credentials! Please Try Again!",
            });
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            console.log("password not match");
            return res.status(200).json({
                status: "fail",
                message: "Invalid Credentials! Please Try Again!",
            });
        }

        const existingPortfolio = await UserPortfolio.findOne({
            userID: existingUser._id,
        });
        if (!existingPortfolio) {
            return res.status(400).json({
                status: "fail",
                message: "Fail ! Portfolio Doesn't Exist !",
            });
        }

        let jwt_token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_Token
        );
        return res.status(200).json({
            status: "success",
            token: jwt_token,
            message: "Welcome Back " + username + "!",
            username: username,
            userID: existingUser._id,
            joinDate: existingUser._id.getTimestamp(),
            balance: existingPortfolio.balance,
            portfolio: existingPortfolio.portfolio,
            transaction: existingPortfolio.transaction,
            unitPrice: existingPortfolio.unitPrice,
        });
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

exports.validateToken = async (req, res) => {
    console.log("Called Validate");
    try {
        const token = req.headers.authorization;
        if (!token) {
            console.log("No Token");
            return res.status(400).json({ status: "fail" });
        }

        const validation = jwt.verify(token, process.env.JWT_Token);
        if (!validation) {
            console.log("Token fail verification");
            return res.status(400).json({ status: "fail" });
        }

        const existingUser = await User.findById(validation.id);
        if (!existingUser) {
            console.log("No User!");
            return res.status(400).json({ status: "fail" });
        }
        const existingPortfolio = await UserPortfolio.findOne({
            userID: existingUser._id,
        });
        if (!existingPortfolio) {
            return res.status(400).json({
                status: "fail",
                message: "Fail ! Portfolio Doesn't Exist !",
            });
        }
        return res.status(200).json({
            status: "success",
            username: existingUser.username,
            userID: existingUser._id,
            joinDate: existingUser._id.getTimestamp(),
            //divider
            balance: existingPortfolio.balance,
            portfolio: existingPortfolio.portfolio,
            transaction: existingPortfolio.transaction,
            unitPrice: existingPortfolio.unitPrice,
        });
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

exports.getDashboardInfo = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            return res.status(200).json({
                status: "fail",
                message: "userID Missing!",
            });
        }
        const existingPortfolio = await UserPortfolio.findOne({
            userID: userID,
        });
        if (!existingPortfolio) {
            return res.status(200).json({
                status: "fail",
                message: "Fail ! Portfolio Doesn't Exist !",
            });
        }

        let data = {
            userPortfolio: existingPortfolio,
            portfolioData: [],
            portfolioValue: existingPortfolio.balance,
        };
        let symbolArray = Array.from(existingPortfolio.portfolio.keys());

        for (var i = 0; i < symbolArray.length; i++) {
            const symbol = symbolArray[i];

            const pC_cP_cN = await new Promise((resolve) => {
                localRedis.get(`CurrentInfo_${symbol}`, async (err, data) => {
                    if (err) return null;
                    if (data != null) {
                        resolve(JSON.parse(data));
                    } else {
                        try {
                            let url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price`;
                            let response = await axios.get(url);
                            let currentInfo = {
                                previousClose:
                                    response.data.quoteSummary.result[0].price
                                        .regularMarketPreviousClose.raw,
                                currentPrice:
                                    response.data.quoteSummary.result[0].price
                                        .regularMarketPrice.raw,
                                companyName:
                                    response.data.quoteSummary.result[0].price
                                        .shortName,
                            };
                            localRedis.SETEX(
                                `CurrentInfo_${symbol}`,
                                5,
                                JSON.stringify(currentInfo)
                            );
                            resolve(currentInfo);
                        } catch (err) {
                            return null;
                        }
                    }
                });
            });

            const previousClose = pC_cP_cN.previousClose;
            const currentPrice = pC_cP_cN.currentPrice;
            const companyName = pC_cP_cN.companyName;

            // const symbol = symbolArray[i];
            // let url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price`;

            // let response = await axios.get(url);

            // const previousClose =
            //     response.data.quoteSummary.result[0].price
            //         .regularMarketPreviousClose.raw;
            // const currentPrice =
            //     response.data.quoteSummary.result[0].price.regularMarketPrice
            //         .raw;
            // const companyName =
            //     response.data.quoteSummary.result[0].price.shortName;
            const position = existingPortfolio.portfolio.get(symbol);
            const unitPrice = existingPortfolio.unitPrice.get(symbol);
            const marketValue = Math.abs(position) * currentPrice;

            const previousClose_unitPrice =
                unitPrice > previousClose ? unitPrice : previousClose;

            data.portfolioValue += marketValue;

            data.portfolioData.push({
                symbol: symbol,
                currentPrice: currentPrice.toFixed(2),
                companyName: companyName,
                position: position,
                averageCost: unitPrice.toFixed(2),
                marketValue: parseFloat(marketValue).toFixed(2),
                todayReturn: {
                    raw: (
                        Math.abs(position) *
                        parseFloat(currentPrice - previousClose_unitPrice)
                    ).toFixed(2),
                    fmt:
                        (
                            ((currentPrice - previousClose_unitPrice) /
                                previousClose_unitPrice) *
                            100
                        ).toFixed(2) + "%",
                },
                totalReturn: {
                    raw: (
                        Math.abs(position) *
                        parseFloat(currentPrice - unitPrice)
                    ).toFixed(2),
                    fmt:
                        (
                            ((currentPrice - unitPrice) / unitPrice) *
                            100
                        ).toFixed(2) + "%",
                },
            });
        }

        return res.status(200).json({
            status: "success",
            data: data,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};
