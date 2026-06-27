const express = require("express");

const router = express.Router();

const notificationController = require("../controller/notification.controller");

const authMiddleware = require("../../../middlewares/security/auth.middleware");

router.use(authMiddleware);

router.get(
  "/me",
  (req, res, next) =>
    notificationController.getMyNotifications(
      req,
      res,
      next
    )
);

router.patch(
  "/:id/read",
  (req, res, next) =>
    notificationController.markAsRead(
      req,
      res,
      next
    )
);

module.exports = router;