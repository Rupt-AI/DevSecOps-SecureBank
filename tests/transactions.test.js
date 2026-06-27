const request = require("supertest");
const app = require("../src/server.test");

describe("Transactions", () => {
  it("should transfer funds", async () => {
    const res = await request(app)
      .post("/api/v1/transactions/transfer")
      .send({
        senderAccountId: "uuid-1",
        receiverAccountId: "uuid-2",
        amount: 100,
        description: "Test transfer",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});