const prisma = require("../../../config/database/prisma");

class NotificationRepository {
  async create(data) {
    return prisma.notification.create({
      data,
    });
  }

  async findByUser(userId) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markAsRead(id) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}

module.exports = new NotificationRepository();