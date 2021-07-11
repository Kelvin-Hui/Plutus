const epxress = require("express");
const router = epxress.Router();

const { buy, sell, reset } = require("../controllers/orderController");

router.route("/buy").post(buy);
router.route("/sell").post(sell);
router.route("/reset").post(reset);

module.exports = router;
