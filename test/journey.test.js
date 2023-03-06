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

// describe("POST /addJourney", () => {
//   it("Adding a journey", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addJourney")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         from: "Pune",
//         to: "Bhilai",
//         bus: "640161aa5298105b58233170",
//         tax: "6401569b99732683325dce76",
//         coupons: "640156bc99732683325dce7a",
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllJourneys", () => {
  it("should return all journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllJourneys")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeJourneyByID/:id", () => {
//   it("should remove one journey by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeJourneyByID/6405c884143d674ba3ba9708")
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

// describe("PATCH /updateJourneys/:id", () => {
//   it("updating a journey", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateJourneys/64017379144184bd8a8e032a")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         bus: "6405bf252f617b008e7dcf5f"
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
