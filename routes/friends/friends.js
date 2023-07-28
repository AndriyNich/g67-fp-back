const express = require("express");

const ctrl = require("../../controllers/friends");

const router = express.Router();

router.get("/", ctrl.getList);

module.exports = router;
