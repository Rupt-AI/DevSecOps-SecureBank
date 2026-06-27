const prisma = require(
  "../../config/database/prisma"
);

const BaseRepository = require(
  "../base/BaseRepository"
);

class AuditRepository
  extends BaseRepository {
  constructor() {
    super(prisma.auditLog);
  }

  async log(data) {
    return this.create(data);
  }
}

module.exports =
  new AuditRepository();