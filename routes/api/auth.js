const express = require("express");

const ctrl = require("../../controllers/auth");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
