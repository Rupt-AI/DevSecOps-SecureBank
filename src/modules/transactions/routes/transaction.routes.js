const express = require("express");

const router = express.Router();

const transactionController = require("../controller/transaction.controller");

const authMiddleware = require("../../../middlewares/security/auth.middleware");

const validateDto = require("../../../dto/common/validateDto");

const transferDto = require("../../../dto/transaction/transfer.dto");

router.use(authMiddleware);

router.post(
  "/transfer",
  validateDto(transferDto),
  (req, res, next) =>
    transactionController.transfer(req, res, next)
);

router.get(
  "/history/:accountId",
  (req, res, next) =>
    transactionController.history(req, res, next)
);

module.exports = router;