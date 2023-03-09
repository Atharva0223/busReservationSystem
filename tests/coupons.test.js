const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

// describe("POST /addCoupons", () => {
//   it("Adding a coupon", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .post("/addCoupons")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Coupon_4",
//         details: "Rs 250 off",
//         code: "250OFF",
//         value: "250",
//         validity_start: "2023-02-03",
//         validity_end: "2023-03-03",
//         createdBy: "640155ad99732683325dce60",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });

describe("GET /getAllCoupons", () => {
  it("should return all coupons", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /removeCouponByID/:id", () => {
//   it("should remove one coupon by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeCouponByID/6405c1d7e7c59e056da3bf22")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedCoupons", () => {
  it("should show all the removed coupons", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("PATCH /updateCoupons/:id", () => {
  it("updating a coupon", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateCoupons/640156bc99732683325dce7a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(201);
  });
});
