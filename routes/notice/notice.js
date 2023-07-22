const express = require("express");

const ctrl = require("../../controllers/notice");
const { addSchema } = require("../../models/notice");

const {
  validateBody,
  authenticate,
  isValidId,
  authenticateUpp,
} = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, validateBody(addSchema), ctrl.addNotice);

// router.delete('/:id', authenticate, isValidId, ctrl.deletePetById);

router.get("/", authenticateUpp, ctrl.getList);

router.get("/:id", authenticateUpp, ctrl.getNoticeById);

module.exports = router;
