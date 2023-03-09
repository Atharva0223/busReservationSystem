const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /addJourneyStops", () => {
//   it("Adding a journeyStop", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addJourneyStops")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         journey: "64017379144184bd8a8e032a",
//         stops: "640156cc99732683325dce7c",
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllJourneyStops", () => {
  it("should return all journeysStops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeJourneyStopsByID/:id", () => {
//   it("should remove one journeyStop by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeJourneyStopsByID/6405cbb573e1ea6594c0bd48")
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
