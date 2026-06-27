const prisma = require("../../../config/database/prisma");

class TransactionRepository {
  async createTransaction(data, tx = prisma) {
    return tx.transaction.create({
      data,
    });
  }

  async getAccountHistory(accountId) {
    return prisma.transaction.findMany({
      where: {
        OR: [
          { senderAccountId: accountId },
          { receiverAccountId: accountId },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

module.exports = new TransactionRepository();