const app = require("../app");
require("../jest_config/jest_connect")
const request = require("supertest");
const tokens = require("../jest_config/Tokens");

// describe("POST /booking", () => {
//   it("Adding a booking", async () => {
//     const token = tokens.customerToken;
//     const res = await request(app)
//     .post("/booking")
//     .set("Authorization", `Bearer ${token}`)
//     .send({
//       customer: "6405495ea5f139ba2e21cf29",
//       journey: "64017379144184bd8a8e032a",
//       passengers:  [
//         {"passenger_name": "asd sdf", "age":"25", "gender":"male"},
//         {"passenger_name": "sdf dfg", "age":"25", "gender":"male"},
//         {"passenger_name": "dfg fgh", "age":"25", "gender":"male"},
//         {"passenger_name": "fgh ghj", "age":"25", "gender":"male"}
//     ],
//     bus: "640161aa5298105b58233170",
//     });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllBookings", () => {
  it("should return all bookings", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /cancelBookingById/:id", () => {
//   it("should remove one booking by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/cancelBookingById/6405758edf666666d7152093")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllcanceledBookings", () => {
  it("should show all the removeed booking", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllcanceledBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateBooking/:id", () => {
//   it("updating a booking", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/updateBooking/6405b1bcbbc0edaf7fe1c257")
//     .set("Authorization", `Bearer ${token}`)
//     .send({
//       customer: "64057452b8f01219592d8ad4",
//     });
//     expect(res.statusCode).toBe(201);
//   });
// });
