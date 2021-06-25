const epxress = require("express");
const router = epxress.Router();

const { getOptionChains } = require("../api/optionChainsAPI");

router.route("/").get(getOptionChains);

module.exports = router;
