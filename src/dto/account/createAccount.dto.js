const { z } = require("zod");

const createAccountDto = z.object({
  accountType: z.enum([
    "SAVINGS",
    "CURRENT",
  ]),
});

module.exports =
  createAccountDto;