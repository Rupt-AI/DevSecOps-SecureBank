const jwt = require("jsonwebtoken");
const AppError = require("../../utils/errors/AppError");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(
      new AppError("No token provided", 401)
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return next(
      new AppError("Invalid token", 401)
    );
  }
};