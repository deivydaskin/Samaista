const express = require("express");
const router = express.Router();

const MenuController = require("../../controller/menus");

router.route("/").get(MenuController.getMenu);

router.route("/").post(MenuController.addMenu);

module.exports = router;
