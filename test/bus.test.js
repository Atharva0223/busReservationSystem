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

describe("GET /getAllBuses", () => {
  it("should return all buses", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .get("/getAllBuses")
    .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

