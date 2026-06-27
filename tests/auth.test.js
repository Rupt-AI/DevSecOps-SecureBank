const request = require("supertest");
const app = require("../src/server.test");

describe("Auth System", () => {
  it("should register user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "12345678",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "john@test.com",
        password: "12345678",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
  });
});