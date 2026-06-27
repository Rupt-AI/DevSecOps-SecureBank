const transactionService = require("../service/transaction.service");
const ApiResponse = require("../../../utils/responses/ApiResponse");

class TransactionController {
  async transfer(req, res, next) {
    try {
      const result = await transactionService.transfer(
        req.body
      );

      res.status(200).json(
        ApiResponse.success(
          "Transfer successful",
          result
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async history(req, res, next) {
    try {
      const result =
        await transactionService.getHistory(
          req.params.accountId
        );

      res.status(200).json(
        ApiResponse.success(
          "Transaction history fetched",
          result
        )
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TransactionController();