const epxress = require("express");
const router = epxress.Router();

const { createAccount } = require("../api/authAPI");

router.route("/register").post(createAccount);

module.exports = router;
