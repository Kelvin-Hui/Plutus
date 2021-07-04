const epxress = require("express");
const router = epxress.Router();

const { getNews } = require("../api/marketNewsAPI");

router.route("/").get(getNews);

module.exports = router;
