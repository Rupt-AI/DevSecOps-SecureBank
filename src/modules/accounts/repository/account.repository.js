const prisma = require("../../../config/database/prisma");

class AccountRepository {
  async createAccount(data) {
    return prisma.account.create({
      data,
    });
  }

  async findByUserId(userId) {
    return prisma.account.findMany({
      where: { userId },
    });
  }

  async findByAccountNumber(accountNumber) {
    return prisma.account.findUnique({
      where: { accountNumber },
    });
  }

  async findById(id) {
    return prisma.account.findUnique({
      where: { id },
    });
  }

  async updateBalance(id, balance) {
    return prisma.account.update({
      where: { id },
      data: { balance },
    });
  }

  async updateStatus(id, status) {
    return prisma.account.update({
      where: { id },
      data: { status },
    });
  }
}

module.exports = new AccountRepository();