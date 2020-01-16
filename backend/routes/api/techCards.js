const express = require("express");
const router = express.Router();

const TechCardController = require("../../controller/techCards");

router.route("/").get(TechCardController.getTechCard);

router.route("/").post(TechCardController.addTechCard);

module.exports = router;
