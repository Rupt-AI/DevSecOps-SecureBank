const express = require("express");

const router = express.Router();

const authController = require("../controller/auth.controller");

const validateDto = require("../../../dto/common/validateDto");

const registerDto = require("../../../dto/auth/register.dto");
const loginDto = require("../../../dto/auth/login.dto");

router.post(
  "/register",
  validateDto(registerDto),
  (req, res, next) =>
    authController.register(req, res, next)
  /**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register user
 */
);

router.post(
  "/login",
  validateDto(loginDto),
  (req, res, next) =>
    authController.login(req, res, next)
  /**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 */
);

router.post(
  "/logout",
  (req, res, next) =>
    authController.logout(req, res, next)
);

module.exports = router;