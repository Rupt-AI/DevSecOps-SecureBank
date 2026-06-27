const AppError = require(
  "../../utils/errors/AppError"
);

const validateDto = (schema) => {
  return (req, res, next) => {
    const result =
      schema.safeParse(req.body);

    if (!result.success) {
      const message =
        result.error.errors
          .map((e) => e.message)
          .join(", ");

      return next(
        new AppError(message, 400)
      );
    }

    req.body = result.data;

    next();
  };
};

module.exports = validateDto;