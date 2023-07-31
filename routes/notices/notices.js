const express = require("express");

const ctrl = require("../../controllers/notices");
const { addSchema } = require("../../models/notices");

const {
  validateBody,
  authenticate,
  isValidId,
  authenticateDetails,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("avatar"),
  validateBody(addSchema),
  ctrl.addNotice
);

router.patch(
  "/:id/favorites",
  authenticate,
  isValidId,
  ctrl.addNoticeByIdToUserFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteNoticeById);

router.delete(
  "/:id/favorites/",
  authenticate,
  isValidId,
  ctrl.deleteFavoriteById
);

router.get("/", authenticateDetails, ctrl.getList);

router.get("/favorites", authenticate, ctrl.getFavoriteListByUserId);

router.get("/users", authenticate, ctrl.getNoticeListByUserId);

router.get("/:id", authenticateDetails, ctrl.getNoticeById);

module.exports = router;
