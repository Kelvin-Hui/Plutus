const epxress = require("express");
const router = epxress.Router();

const { getQuote, getInfo } = require("../controllers/searchQuoteController");

router.route("/").get(getQuote);
router.route("/getInfo").get(getInfo);
// router.route("/getPrice").get(getPrice);

module.exports = router;
