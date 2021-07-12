const epxress = require("express");
const router = epxress.Router();

const { getQuote, getPrice } = require("../controllers/searchQuoteController");

router.route("/").get(getQuote);
// router.route("/getPrice").get(getPrice);

module.exports = router;
