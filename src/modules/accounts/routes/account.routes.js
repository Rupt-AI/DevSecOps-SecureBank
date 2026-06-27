const express = require("express");

const router = express.Router();

const accountController = require("../controller/account.controller");

const authMiddleware = require("../../../middlewares/security/auth.middleware");

const validateDto = require("../../../dto/common/validateDto");

const createAccountDto = require("../../../dto/account/createAccount.dto");

router.use(authMiddleware);

router.post(
  "/",
  validateDto(createAccountDto),
  (req, res, next) =>
    accountController.createAccount(req, res, next)
);

router.get(
  "/my",
  (req, res, next) =>
    accountController.getMyAccounts(req, res, next)
);

router.get(
  "/:id",
  (req, res, next) =>
    accountController.getAccount(req, res, next)
);

module.exports = router;