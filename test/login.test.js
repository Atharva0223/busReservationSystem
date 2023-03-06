const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const tokens = require("../setupTest");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /employeeLogin", () => {
  it("employee should login", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .post("/employeeLogin")
    .set("Authorization", `Bearer ${token}`)
    .send({
      email: "donald@mail.in",
      password: "password",
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("POST /customerLogin", () => {
    it("customer should login", async () => {
      const token = tokens.customerToken;
      const res = await request(app)
      .post("/customerLogin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "scrooge@mail.in",
        password: "password",
      });
      expect(res.statusCode).toBe(201);
    });
  });