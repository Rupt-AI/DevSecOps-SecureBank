const logger = require("./logger");

module.exports = (
  req,
  res,
  next
) => {
  logger.info(
    `${req.method} ${req.originalUrl}`
  );

  next();
};