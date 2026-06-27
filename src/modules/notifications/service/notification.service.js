const notificationRepository = require("../repository/notification.repository");

class NotificationService {
  async createNotification(data) {
    return notificationRepository.create(data);
  }

  async getUserNotifications(userId) {
    return notificationRepository.findByUser(userId);
  }

  async markAsRead(id) {
    return notificationRepository.markAsRead(id);
  }
}

module.exports = new NotificationService();