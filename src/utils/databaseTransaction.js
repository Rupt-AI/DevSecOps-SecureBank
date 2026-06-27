const prisma = require(
  "../config/database/prisma"
);

const databaseTransaction =
  async (callback) => {
    return prisma.$transaction(
      async (tx) => {
        return callback(tx);
      }
    );
  };

module.exports =
  databaseTransaction;