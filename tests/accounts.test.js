const request = require("supertest");
const app = require("../src/server.test");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "john@test.com",
      password: "12345678",
    });

  token = res.body.data.accessToken;
});

describe("Accounts", () => {
  it("should create account", async () => {
    const res = await request(app)
      .post("/api/v1/accounts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        accountType: "SAVINGS",
      });

    expect(res.statusCode).toBe(201);
  });
});