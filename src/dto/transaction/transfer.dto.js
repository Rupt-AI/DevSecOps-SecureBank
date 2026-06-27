const { z } = require("zod");

const transferDto = z.object({
  senderAccountId: z.string().uuid(),

  receiverAccountId: z.string().uuid(),

  amount: z
    .number()
    .positive()
    .min(1),

  description: z
    .string()
    .max(255)
    .optional(),
});

module.exports =
  transferDto;