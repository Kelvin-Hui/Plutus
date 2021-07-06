let User = require("../models/userModel");

exports.createAccount = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("Create Account Fail -> UserName Already Exist");
            return res.status(200).json({
                status: "fail",
                message: "Username already exists :(",
            });
        }
        const newUser = new User({ username: username, password: password });

        newUser
            .save()
            .then(() =>
                res.status(200).json({
                    status: "scuccess",
                    message: "User Created : " + username,
                })
            )
            .catch((err) =>
                res.status(400).json({ status: "fail", message: err.message })
            );
        console.log("Created Account : " + username + " -> " + password);
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
};
