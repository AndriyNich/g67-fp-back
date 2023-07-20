const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../../app");

const { DB_HOST, PORT } = process.env;

describe("POST /api/users/login", () => {
  beforeAll(() => {
    mongoose.set("strictQuery", true);

    mongoose.connect(DB_HOST).then(() => {
      app.listen(PORT, () => {});
    });
  });

  it("should return token and user", async () => {
    const testUser = {
      email: "mango8@gmail.com",
      password: "123457",
    };

    const res = await request(app).post("/api/users/login").send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );

    const { email } = res.body?.user;

    expect(email).toBe(testUser.email);
  });

  it("should return 'Email or password is wrong'", async () => {
    const testUser = {
      email: "mango8@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(testUser);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );

    const { message } = res.body;
    expect(message).toBe("Email or password is wrong");
  });

  it("should return login validation error", async () => {
    const testUser = {
      email: "mango8@gmail.com",
      password: "12345",
    };

    const res = await request(app).post("/api/users/login").send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
