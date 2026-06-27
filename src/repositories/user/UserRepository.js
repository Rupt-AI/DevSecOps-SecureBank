const prisma = require(
  "../../config/database/prisma"
);

const BaseRepository = require(
  "../base/BaseRepository"
);

class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email) {
    return this.model.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserWithAccounts(id) {
    return this.model.findUnique({
      where: { id },

      include: {
        accounts: true,
      },
    });
  }

  async softDelete(id) {
    return this.model.update({
      where: { id },

      data: {
        isDeleted: true,
      },
    });
  }
}

module.exports =
  new UserRepository();