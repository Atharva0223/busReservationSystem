const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /registerCustomer", () => {
//   it("Adding a customer", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/registerCustomer")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Lisa Simpson",
//         email: "lisa@mail.in",
//         address: "Texas",
//         password: "password",
//         phone: "1232343454",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllCustomers", () => {
  it("should return all customers", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllCustomers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeCustomerById/:id", () => {
//   it("should remove one customer by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeCustomerById/6405c34c925e2181f7cae6d2")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedCustomers", () => {
  it("should show all the removed customer", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedCustomers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateCustomer/:id", () => {
//   it("updating a customer", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateCustomer/64057452b8f01219592d8ad4")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         address: "Antartica",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
