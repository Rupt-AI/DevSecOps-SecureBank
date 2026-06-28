const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const compression = require(
  "compression"
);
const cors = require("cors");

const requestLogger = require(
  "./src/middlewares/logging/requestLogger"
);

const errorMiddleware = require(
  "./src/middlewares/error/errorMiddleware"
);
const authRoutes = require("./src/modules/auth/routes/auth.routes");
const accountRoutes = require("./src/modules/accounts/routes/account.routes");
const transactionRoutes = require("./src/modules/transactions/routes/transaction.routes");
const notificationRoutes = require("./src/modules/notifications/routes/notification.routes")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger/swagger");

const app = express();

app.use(cors());

app.use(helmet());

app.use(hpp());

app.use(compression());

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.use(errorMiddleware);

module.exports = app;const password = "SuperSecret123";
