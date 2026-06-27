const { z } = require("zod");

const registerDto = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50),

  lastName: z.string().min(2).max(50),

  email: z.string().email(),

  password: z
    .string()
    .min(6)
    .max(100),
});

module.exports = registerDto;