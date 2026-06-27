const prisma = require(
  "../../config/database/prisma"
);

const BaseRepository = require(
  "../base/BaseRepository"
);

class NotificationRepository
  extends BaseRepository {
  constructor() {
    super(prisma.notification);
  }

  async unread(userId) {
    return this.model.findMany({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}

module.exports =
  new NotificationRepository();