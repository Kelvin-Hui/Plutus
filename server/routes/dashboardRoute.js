const epxress = require("express");
const router = epxress.Router();

const { getDashboardInfo } = require("../controllers/dashboardController");

router.route("/getDashboardInfo").get(getDashboardInfo);

module.exports = router;
