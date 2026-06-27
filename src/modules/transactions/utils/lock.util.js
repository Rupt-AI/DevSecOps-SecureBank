const prisma = require("../../../config/database/prisma");

const lockAccount = async (accountId, tx) => {
  return tx.account.findUnique({
    where: { id: accountId },
  });
};

module.exports = {
  lockAccount,
};