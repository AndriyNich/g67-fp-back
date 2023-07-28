const express = require("express");

const ctrl = require("../../controllers/pet");
const { addSchema } = require("../../models/pet");

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("avatar"),
  validateBody(addSchema),
  ctrl.addPet
);

router.delete("/:id", authenticate, isValidId, ctrl.deletePetById);

router.get("/", authenticate, ctrl.getPets);

module.exports = router;
