let UserPortfolio = require("../models/userPortfolioModel");

const axios = require("axios");

exports.buy = async (req, res) => {
    console.log("Buy Stock");
    try {
        const { userID, symbol, quantity } = req.body;

        if (quantity <= 0) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Invalid Quantity !",
            });
        }

        const existingPortfolio = await UserPortfolio.findOne({
            userID: userID,
        });
        if (!existingPortfolio) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Portfolio Doesn't Exist !",
            });
        }

        const response = await axios({
            method: "get",
            url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`,
            timeout: 1000,
            params: {
                modules: "price",
            },
        });

        const currentPrice =
            response.data.quoteSummary.result[0].price.regularMarketPrice.raw;

        if (!currentPrice) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Please Try Again !",
            });
        }

        const totalPrice = Math.abs(currentPrice * quantity);
        let balance = existingPortfolio.balance;

        if (balance < totalPrice) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Insufficient Balance !",
            });
        }

        let avgPrice = existingPortfolio.unitPrice.get(symbol);
        avgPrice = avgPrice === undefined ? 0 : avgPrice;
        let position = existingPortfolio.portfolio.get(symbol);
        position = position === undefined ? 0 : position;

        let newAvgPrice = avgPrice;
        let newBalance = balance;
        let pnl = 0;

        if (position >= 0) {
            newBalance -= totalPrice;
            newAvgPrice =
                (position * avgPrice + currentPrice * quantity) /
                (position + quantity);
        } else if (position < 0) {
            newBalance += quantity * avgPrice;
            pnl =
                (avgPrice - currentPrice) *
                Math.min(Math.abs(position), quantity);
            newbalance += pnl;
            if (position == -quantity) {
                newAvgPrice = 0;
            }
        }
        existingPortfolio.unitPrice.set(symbol, newAvgPrice);
        existingPortfolio.portfolio.set(`${symbol}`, position + quantity);
        existingPortfolio.save();

        const updatedPortfolio = await UserPortfolio.findByIdAndUpdate(
            existingPortfolio._id,
            {
                balance: newBalance,
                $push: {
                    transaction: {
                        symbol: symbol,
                        quantity: quantity,
                        price: currentPrice,
                        pnl: pnl,
                        date: new Date(),
                    },
                },
            }
        );

        return res.status(200).json({
            status: "success",
            message: `Bought ${quantity} Share of ${symbol} @ ${currentPrice} !`,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.sell = async (req, res) => {
    console.log("Sell Stock");
    try {
        const { userID, symbol, quantity } = req.body;

        if (quantity >= 0) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Invalid Quantity !",
            });
        }

        const existingPortfolio = await UserPortfolio.findOne({
            userID: userID,
        });
        if (!existingPortfolio) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Portfolio Doesn't Exist !",
            });
        }

        const response = await axios({
            method: "get",
            url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`,
            timeout: 1000,
            params: {
                modules: "price",
            },
        });
        const currentPrice =
            response.data.quoteSummary.result[0].price.regularMarketPrice.raw;

        if (!currentPrice) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Please Try Again !",
            });
        }
        const totalPrice = Math.abs(currentPrice * quantity);
        let balance = existingPortfolio.balance;

        if (balance < totalPrice) {
            return res.status(200).json({
                status: "fail",
                message: "Order Fail ! Insufficient Balance !",
            });
        }

        let avgPrice = existingPortfolio.unitPrice.get(symbol);
        avgPrice = avgPrice === undefined ? 0 : avgPrice;
        let position = existingPortfolio.portfolio.get(symbol);
        position = position === undefined ? 0 : position;

        let newAvgPrice = avgPrice;
        let newBalance = balance;
        let pnl = 0;

        if (position <= 0) {
            newBalance -= totalPrice;
            newAvgPrice =
                (Math.abs(position) * avgPrice +
                    currentPrice * Math.abs(quantity)) /
                (Math.abs(position) + Math.abs(quantity));
        } else if (position > 0) {
            newBalance += Math.abs(quantity) * avgPrice;
            pnl =
                (currentPrice - avgPrice) *
                Math.min(position, Math.abs(quantity));
            newBalance += pnl;
            if (position == -quantity) {
                newAvgPrice = 0;
            }
        }

        existingPortfolio.unitPrice.set(symbol, newAvgPrice);
        existingPortfolio.portfolio.set(`${symbol}`, position + quantity);
        existingPortfolio.save();

        const updatedPortfolio = await UserPortfolio.findByIdAndUpdate(
            existingPortfolio._id,
            {
                balance: newBalance,
                $push: {
                    transaction: {
                        symbol: symbol,
                        quantity: quantity,
                        price: currentPrice,
                        pnl: pnl,
                        date: new Date(),
                    },
                },
            }
        );

        return res.status(200).json({
            status: "success",
            message: `Sold ${Math.abs(
                quantity
            )} Share of ${symbol} @ ${currentPrice} !`,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.reset = async (req, res) => {
    try {
        const { userID } = req.body;
        const existingPortfolio = await UserPortfolio.findOne({
            userID: userID,
        });
        if (!existingPortfolio) {
            return res.status(200).json({
                status: "fail",
                message: "Fail Reset! Portfolio Doesn't Exist !",
            });
        }
        const updatedPortfolio = await UserPortfolio.findByIdAndUpdate(
            existingPortfolio._id,
            {
                balance: 25000,
                transaction: [],
                portfolio: {},
                unitPrice: {},
            }
        );
        return res.status(200).json({
            status: "success",
            message: "Resetted Everything!",
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};
