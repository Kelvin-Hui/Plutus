const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers("Authorization");
        if (!token) {
            return res.status(401).json({
                staus: "fail",
                message: "Unauthorized Request!",
            });
        }
        const verified = jwt.verify(token, process.env.JWT_Token);
        if (!verified) {
            return res.status(401).json({
                staus: "fail",
                message: "Unauthorized Request!",
            });
        }
        next();
    } catch (error) {
        return res.status(200).json({
            staus: "fail",
            message: error.message,
        });
    }
};

module.exports = auth;
