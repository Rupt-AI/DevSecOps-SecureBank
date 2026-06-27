const ApiResponse = require(
  "../../utils/responses/ApiResponse"
);

module.exports = (
  err,
  req,
  res,
  next
) => {
  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json(
    ApiResponse.error(
      err.message || "Internal Server Error"
    )
  );
};