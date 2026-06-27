const { z } = require("zod");

const loginDto = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});

module.exports = loginDto;