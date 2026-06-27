const accountRepository = require("../repository/account.repository");
const AppError = require("../../../utils/errors/AppError");
const {
  generateAccountNumber,
} = require("../utils/accountNumber.util");

class AccountService {
  async createAccount(userId, data) {
    const existingAccounts =
      await accountRepository.findByUserId(userId);

    if (existingAccounts.length >= 3) {
      throw new AppError(
        "Maximum account limit reached",
        403
      );
    }

    const accountNumber = generateAccountNumber();

    const account =
      await accountRepository.createAccount({
        userId,
        accountNumber,
        accountType: data.accountType,
        balance: 0.0,
        status: "ACTIVE",
      });

    return account;
  }

  async getUserAccounts(userId) {
    return accountRepository.findByUserId(userId);
  }

  async getAccountById(accountId) {
    const account =
      await accountRepository.findById(accountId);

    if (!account) {
      throw new AppError(
        "Account not found",
        404
      );
    }

    return account;
  }

  async updateBalance(accountId, amount) {
    const account =
      await accountRepository.findById(accountId);

    if (!account) {
      throw new AppError(
        "Account not found",
        404
      );
    }

    const newBalance =
      Number(account.balance) + Number(amount);

    return accountRepository.updateBalance(
      accountId,
      newBalance
    );
  }

  async freezeAccount(accountId) {
    return accountRepository.updateStatus(
      accountId,
      "SUSPENDED"
    );
  }

  async closeAccount(accountId) {
    return accountRepository.updateStatus(
      accountId,
      "CLOSED"
    );
  }
}

module.exports = new AccountService();