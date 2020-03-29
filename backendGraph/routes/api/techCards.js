const express = require("express");
const router = express.Router();

const TechCardController = require("../../controller/techCards");

router.route("/:name").get(TechCardController.getTechCard);
router.route("/").get(TechCardController.getTechCardsAll);
router.route("/").post(TechCardController.addTechCard);

module.exports = router;
