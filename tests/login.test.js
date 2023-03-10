const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

describe("POST /employeeLogin", () => {
  //successful login
  it("employee should login", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/employeeLogin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "shin@mail.in",
        password: "Password@1",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login Successful");
    console.log(res.body.message);
  });
  //all fields are required
  it("employee should login", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/employeeLogin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "marge@mail.in",
        password: "",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
});

//---------------------------------------------------------------------------------


describe("POST /customerLogin", () => {
  //login successful
  it("customer should login", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/customerLogin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "jane@mail.in",
        password: "Password@1",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login Successful");
    console.log(res.body.message);
  });
  //all fields are required
  it("customer should login", async () => {
      const token = tokens.customerToken;
      const res = await request(app)
        .post("/customerLogin")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "scrooge@mail.in",
          password: "",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("All fields are required");
      console.log(res.body.message);
    });
});
