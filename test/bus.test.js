const supertest = require("supertest");
const mongoose = require("mongoose");
const index = require("../index");
const request = supertest(index);

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /getAllBus/:weekday", () => {
  it("should return all buses for a weekday", async () => {
    const res = await request.get("/getAllBus/0");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("docs");
    expect(res.body.docs.length).toBeGreaterThan(0);
  });
});

