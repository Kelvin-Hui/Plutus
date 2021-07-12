const epxress = require("express");
const router = epxress.Router();

const {
    createAccount,
    loginAccount,
    validateToken,
    getInfo,
    getDashboardInfo,
} = require("../controllers/authController");

router.route("/register").post(createAccount);
router.route("/login").post(loginAccount);
router.route("/validate").post(validateToken);

router.route("/getInfo").get(getInfo);
router.route("/getDashboardInfo").get(getDashboardInfo);

module.exports = router;
