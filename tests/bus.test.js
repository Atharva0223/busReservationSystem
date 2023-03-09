const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /addBus", () => {
//   it("Adding a Bus", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addBus")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "CDE",
//         plate: "MH01AB3456",
//         type_of_bus: "sleaper",
//         capacity: "40",
//         available_seats: "40",
//         seats: "6401568199732683325dce72",
//         working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllBuses", () => {
  it("should return all buses", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeBus/:id", () => {
//   it("should remove one bus by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeBus/6405bd3f6e73e853d516b547")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedBuses", () => {
  it("should show all the removeed buses", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateBus/:id", () => {
//   it("updating a bus", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/updateBus/6405bf252f617b008e7dcf5f")
//     .set("Authorization", `Bearer ${token}`)
//     .send({
//       type_of_bus: "seater",
//       seats: "6401567599732683325dce6e"
//     });
//     expect(res.statusCode).toBe(201);
//   });
// });
