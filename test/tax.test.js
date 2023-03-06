const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const tokens = require("../setupTest");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});

// describe("POST /addTaxes", () => {
//   it("Adding a tax", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addTaxes")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         state_cross_tax: "100",
//         cgst: "0.9",
//         sgst: "0.9",
//         tolls: "100",
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllTaxes", () => {
  it("should return all taxes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeTax/:id", () => {
//   it("should remove one tax by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeTax/6405d4a00c825a99d1a1ded2")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllremovedTaxes", () => {
  it("should show all the removed taxes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllremovedTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateTax/:id", () => {
//   it("updating a tax", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateTax/640591827c972a428c1d76f8")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         state_cross_tax: 300,
//         tolls: 300,
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
