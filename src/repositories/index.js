module.exports = {
  userRepository:
    require("./user/UserRepository"),

  accountRepository:
    require("./account/AccountRepository"),

  transactionRepository:
    require(
      "./transaction/TransactionRepository"
    ),

  notificationRepository:
    require(
      "./notification/NotificationRepository"
    ),

  auditRepository:
    require("./audit/AuditRepository"),
};