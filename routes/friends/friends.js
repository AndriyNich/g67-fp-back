const express = require("express");

const ctrl = require("../../controllers/friend");

const router = express.Router();

router.get("/", ctrl.getList);

module.exports = router;
