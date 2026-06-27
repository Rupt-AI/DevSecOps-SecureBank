const notificationService = require("../service/notification.service");
const ApiResponse = require("../../../utils/responses/ApiResponse");

class NotificationController {
  async getMyNotifications(req, res, next) {
    try {
      const data =
        await notificationService.getUserNotifications(
          req.user.id
        );

      res.status(200).json(
        ApiResponse.success(
          "Notifications fetched",
          data
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async markAsRead(req, res, next) {
    try {
      await notificationService.markAsRead(
        req.params.id
      );

      res.status(200).json(
        ApiResponse.success("Marked as read")
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NotificationController();