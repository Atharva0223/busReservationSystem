const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /addPaymentTypes", () => {
//   it("Adding a payment type", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addPaymentTypes")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         "paymentTypes":"cheque",
//         "createdBy":"640155ad99732683325dce60"
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllPaymentTypes", () => {
  it("should return all paymentTypes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removePaymentTypeByID/:id", () => {
//   it("should remove one journey by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removePaymentTypeByID/6405c6aa6aaba8e8a5b02169")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedPaymentTypes", () => {
  it("should show all the removed payment types", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updatePaymentTypes/:id", () => {
//   it("updating a payment type", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updatePaymentTypes/6405cfc3d3b81029551d4624")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         "paymentTypes": "Cheque"
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
