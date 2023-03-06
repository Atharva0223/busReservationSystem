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

// describe("POST /addPayment", () => {
//   it("Adding a payment", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addPayment")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         booking: "640176f827edc1df4131a1be",
//         payment_types: "Credit Card",
//         createdBy: "640155ea99732683325dce6a",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllPayments", () => {
  it("should return all payments", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removePaymentsByID/:id", () => {
//   it("should remove one journey by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removePaymentsByID/6405cdb072f63e90fdfc577c")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedJourney", () => {
  it("should show all the removed journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedJourney")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updatePayments/:id", () => {
//   it("updating a journey", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updatePayments/6405cdc8d4e337f1e6bf19ad")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         payment_types: "Debit card"
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

