const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

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
