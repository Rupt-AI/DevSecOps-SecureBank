const prisma = require("../../../config/database/prisma");

class AuthRepository {
  async createUser(data) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async saveRefreshToken(data) {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async revokeRefreshToken(token) {
    return prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }
}

module.exports = new AuthRepository();