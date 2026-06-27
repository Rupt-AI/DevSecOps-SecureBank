const prisma = require(
  "../../config/database/prisma"
);

const BaseRepository = require(
  "../base/BaseRepository"
);

class TransactionRepository
  extends BaseRepository {
  constructor() {
    super(prisma.transaction);
  }

  async getAccountHistory(
    accountId
  ) {
    return this.model.findMany({
      where: {
        OR: [
          {
            senderAccountId:
              accountId,
          },
          {
            receiverAccountId:
              accountId,
          },
        ],
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

module.exports =
  new TransactionRepository();