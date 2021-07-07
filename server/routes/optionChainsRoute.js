const epxress = require("express");
const router = epxress.Router();

const { getOptionChains } = require("../controllers/optionChainsController");

router.route("/").get(getOptionChains);

module.exports = router;
