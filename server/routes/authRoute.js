const epxress = require("express");
const router = epxress.Router();

const {
    createAccount,
    loginAccount,
    validateToken,
    getDashboardInfo,
} = require("../controllers/authController");

router.route("/register").post(createAccount);
router.route("/login").post(loginAccount);
router.route("/validate").post(validateToken);

router.route("/getDashboardInfo").get(getDashboardInfo);

module.exports = router;
