const prisma = require(
  "../../config/database/prisma"
);

const BaseRepository = require(
  "../base/BaseRepository"
);

class AccountRepository extends BaseRepository {
  constructor() {
    super(prisma.account);
  }

  async findByAccountNumber(
    accountNumber
  ) {
    return this.model.findUnique({
      where: {
        accountNumber,
      },
    });
  }

  async getUserAccounts(userId) {
    return this.model.findMany({
      where: {
        userId,
      },
    });
  }

  async updateBalance(
    accountId,
    balance
  ) {
    return this.model.update({
      where: {
        id: accountId,
      },

      data: {
        balance,
      },
    });
  }
}

module.exports =
  new AccountRepository();