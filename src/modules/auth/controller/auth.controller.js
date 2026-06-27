const authService = require("../service/auth.service");
const ApiResponse = require("../../../utils/responses/ApiResponse");

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json(
        ApiResponse.success(
          "User registered successfully",
          result
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json(
        ApiResponse.success(
          "Login successful",
          result
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logout(req.body.refreshToken);

      res.status(200).json(
        ApiResponse.success("Logout successful")
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();