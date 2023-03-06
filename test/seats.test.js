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

// describe("POST /addSeats", () => {
//   it("Adding a seat", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addSeats")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         seat_type: "semi seater",
//         seat_fare: "900",
//         createdBy: "640155ad99732683325dce60"
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllSeats", () => {
  it("should return all seats", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeSeatsByID/:id", () => {
//   it("should remove one seat by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeSeatsByID/6405d1b758c6308678713a8d")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedSeats", () => {
  it("should show all the removed seats", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateSeats/:id", () => {
//   it("updating a seat", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateSeats/6405d23c073fc7fcd43227e5")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         seat_fare: 1900,
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
