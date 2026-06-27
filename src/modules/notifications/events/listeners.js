const eventEmitter = require("./eventEmitter");
const notificationService = require("../service/notification.service");
const eventTypes = require("./event.types");

// When transaction succeeds
eventEmitter.on(eventTypes.TRANSACTION_SUCCESS, async (data) => {
  await notificationService.createNotification({
    userId: data.userId,
    title: "Transaction Successful",
    message: `You sent ${data.amount} successfully`,
    type: "PUSH",
  });
});