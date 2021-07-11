let User = require("../models/userModel");
let UserPortfolio = require("../models/userPortfolioModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        // const uID = existingUser._id;
        // const existingPortfolio = await UserPortfolio.findOne({ userID: uID });

        // if (!existingPortfolio) {
        //     console.log("No Portfolio!");
        //     return res.status(400).json({ status: "fail" });
        // }/
        //Get TimeStamp;
        // console.log(existingUser._id.getTimestamp());
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

exports.getInfo = async (req, res) => {
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

        return res.status(200).json({
            status: "success",
            data: existingPortfolio,
        });
    } catch (error) {
        return res.status(200).json({
            status: "fail",
            error: error.message,
        });
    }
};
