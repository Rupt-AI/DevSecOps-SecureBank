const prisma = require("../../../config/database/prisma");
const AppError = require("../../../utils/errors/AppError");
const transactionRepository = require("../repository/transaction.repository");
const eventEmitter = require(
  "../../notifications/events/eventEmitter"
);

const eventTypes = require(
  "../../notifications/events/event.types"
);

class TransactionService {
  async transfer(data) {
    return await prisma.$transaction(async (tx) => {
      const sender = await tx.account.findUnique({
        where: { id: data.senderAccountId },
      });

      const receiver = await tx.account.findUnique({
        where: { id: data.receiverAccountId },
      });

      if (!sender || !receiver) {
        throw new AppError("Account not found", 404);
      }

      if (sender.balance < data.amount) {
        throw new AppError("Insufficient funds", 400);
      }

      if (sender.status !== "ACTIVE") {
        throw new AppError("Sender account blocked", 403);
      }

      // Debit sender
      const updatedSender = await tx.account.update({
        where: { id: sender.id },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      });

      // Credit receiver
      const updatedReceiver = await tx.account.update({
        where: { id: receiver.id },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      });

      // Create transaction record
      const transaction =
        await transactionRepository.createTransaction(
          {
            senderAccountId: sender.id,
            receiverAccountId: receiver.id,
            amount: data.amount,
            description: data.description,
            status: "SUCCESS",
          },
          tx
        );

      return {
        transaction,
        updatedSender,
        updatedReceiver,
        
        
      };
    });

    eventEmitter.emit(eventTypes.TRANSACTION_SUCCESS, {
    userId: sender.userId,
    amount: data.amount,
});

    return result;
  
  }
  

  async getHistory(accountId) {
    return transactionRepository.getAccountHistory(
      accountId
    );
  }
}

module.exports = new TransactionService();