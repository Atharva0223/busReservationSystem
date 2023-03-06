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


describe("GET /getAllEmployees", () => {
  it("should return all employees", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .get("/getAllEmployees")
    .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("POST /registerEmployee", () => {
//   it("employee should register", async () => {
//     const res = await request(app)
//     .post("/registerEmployee")
//     .send({
//       name: "Marge Simpson",
//       email: "marge@mail.in",
//       phone: "1232343453",
//       password: "password",
//       role: "Employee"
//     });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getEmployeeById/:id", () => {
  it("should return one employee by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .get("/getEmployeeById/640155ad99732683325dce60")
    .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeEmployeeById/:id", () => {
//   it("should remove one employee by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeEmployeeById/6405758edf666666d7152093")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedEmployees", () => {
  it("should return all removed employee", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .get("/getAllRemovedEmployees")
    .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("PATCH /updateEmployee/:id", () => {
  it("should update one employee by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
    .patch("/updateEmployee/64054929a5f139ba2e21cf26")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "AST DFG",
      role: "Admin"
    });
    expect(res.statusCode).toBe(200);
  });
});