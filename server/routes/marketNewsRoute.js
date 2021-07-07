const epxress = require("express");
const router = epxress.Router();

const { getNews } = require("../controllers/marketNewsController");

router.route("/").get(getNews);

module.exports = router;
