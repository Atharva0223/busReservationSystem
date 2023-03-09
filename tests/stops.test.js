const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /addStops", () => {
//   it("Adding a stop", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addStops")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         stop_name: "Belendoor",
//         stop_state: "Banglore",
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllStops", () => {
  it("should return all stops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeStopByID/:id", () => {
//   it("should remove one stop by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeStopByID/6405d340534f3f921a68e4bf")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedStops", () => {
  it("should show all the removed stops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateStops/:id", () => {
//   it("updating a seat", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateStops/640156f699732683325dce80")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         stop_name: "Chhatrapati Sambhajinagar",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
