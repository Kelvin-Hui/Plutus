const epxress = require("express");
const router = epxress.Router();

const { getQuote } = require("../api/searchQuoteAPI");

router.route("/").get(getQuote);

module.exports = router;
