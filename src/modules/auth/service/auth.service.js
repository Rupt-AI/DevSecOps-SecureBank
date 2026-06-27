const authRepository = require("../repository/auth.repository");
const { hashPassword, comparePassword } = require("../utils/password.util");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.util");
const AppError = require("../../../utils/errors/AppError");

class AuthService {
  async register(data) {
    const existingUser =
      await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(
      data.password
    );

    const user = await authRepository.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    await authRepository.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(data) {
    const user = await authRepository.findByEmail(
      data.email
    );

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValid = await comparePassword(
      data.password,
      user.password
    );

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    await authRepository.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logout(token) {
    const storedToken =
      await authRepository.findRefreshToken(token);

    if (!storedToken) {
      throw new AppError("Token not found", 404);
    }

    await authRepository.revokeRefreshToken(token);

    return true;
  }
}

module.exports = new AuthService();