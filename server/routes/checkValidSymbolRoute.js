const epxress = require("express");
const router = epxress.Router();

const { checkSymbol } = require("../api/checkValidSymbolAPI");

router.route("/").get(checkSymbol);

module.exports = router;
