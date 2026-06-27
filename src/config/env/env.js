const {
  cleanEnv,
  str,
  port,
} = require("envalid");

const env = cleanEnv(
  process.env,
  {
    PORT: port(),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
  }
);

module.exports = env;