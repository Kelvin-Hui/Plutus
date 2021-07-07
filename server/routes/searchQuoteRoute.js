const epxress = require("express");
const router = epxress.Router();

const { getQuote } = require("../controllers/searchQuoteController");

router.route("/").get(getQuote);

module.exports = router;
