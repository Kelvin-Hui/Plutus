const epxress = require("express");
const router = epxress.Router();

const {
    getQuote,
    getInfo,
    getChart,
} = require("../controllers/searchQuoteController");

router.route("/").get(getQuote);
router.route("/getInfo").get(getInfo);
router.route("/getChart").get(getChart);
// router.route("/getPrice").get(getPrice);

module.exports = router;
