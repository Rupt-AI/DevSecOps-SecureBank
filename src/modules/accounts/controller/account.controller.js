const accountService = require("../service/account.service");
const ApiResponse = require("../../../utils/responses/ApiResponse");

class AccountController {
  async createAccount(req, res, next) {
    try {
      const account =
        await accountService.createAccount(
          req.user.id,
          req.body
        );

      res.status(201).json(
        ApiResponse.success(
          "Account created successfully",
          account
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async getMyAccounts(req, res, next) {
    try {
      const accounts =
        await accountService.getUserAccounts(
          req.user.id
        );

      res.status(200).json(
        ApiResponse.success(
          "Accounts fetched",
          accounts
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async getAccount(req, res, next) {
    try {
      const account =
        await accountService.getAccountById(
          req.params.id
        );

      res.status(200).json(
        ApiResponse.success(
          "Account fetched",
          account
        )
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AccountController();