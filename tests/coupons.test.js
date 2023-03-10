const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();


//----------------------------------------------------------------------------------------
//add

describe("POST /addCoupons", () => {
  //add coupon
    it("Adding a coupon", async () => {
      const token = tokens.employeeToken;
      const res = await request(app)
        .post("/addCoupons")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Coupon_4",
          details: "Rs 250 off",
          code: "250OFF",
          value: "250",
          validity_start: "2023-02-03",
          validity_end: "2023-03-03",
          createdBy: "640155ad99732683325dce60",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    });
  //all fields are required
  it("Adding a coupon", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addCoupons")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        details: "Rs 250 off",
        code: "",
        value: "250",
        validity_start: "2023-02-03",
        validity_end: "2023-03-03",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //customer token
  it("Adding a coupon", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addCoupons")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Coupon_4",
        details: "Rs 250 off",
        code: "250OFF",
        value: "250",
        validity_start: "2023-02-03",
        validity_end: "2023-03-03",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a coupon", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addCoupons")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Coupon_4",
        details: "Rs 250 off",
        code: "250OFF",
        value: "250",
        validity_start: "2023-02-03",
        validity_end: "2023-03-03",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a coupon", async () => {
    const res = await request(app)
      .post("/addCoupons")
      .send({
        name: "Coupon_4",
        details: "Rs 250 off",
        code: "250OFF",
        value: "250",
        validity_start: "2023-02-03",
        validity_end: "2023-03-03",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get all

describe("GET /getAllCoupons", () => {
  //get all
  it("should return all coupons", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //unauthorized
  it("should return all coupons", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should return all coupons", async () => {
    const res = await request(app)
      .get("/getAllCoupons")
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//remove

describe("PATCH /removeCouponByID/:id", () => {
  //remove
    it("should remove one coupon by id", async () => {
      const token = tokens.employeeToken;
      const res = await request(app)
      .patch("/removeCouponByID/6405c1d7e7c59e056da3bf22")
      .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    });
  //exists
  it("should remove one coupon by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeCouponByID/6665c1d7e7c59e056da3bf22")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Coupons not found");
    console.log(res.body.message);
  });
  //customer token
  it("should remove one coupon by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeCouponByID/6405c1d7e7c59e056da3bf22")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should remove one coupon by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeCouponByID/6405c1d7e7c59e056da3bf22")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one coupon by id", async () => {
    const res = await request(app).patch(
      "/removeCouponByID/6405c1d7e7c59e056da3bf22"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get removed

describe("GET /getAllRemovedCoupons", () => {
  //get all removed
  it("should show all the removed coupons", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed coupons", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized
  it("should show all the removed coupons", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedCoupons")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed coupons", async () => {
    const res = await request(app)
      .get("/getAllRemovedCoupons")
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//update
describe("PATCH /updateCoupons/:id", () => {
  //update
  it("updating a coupon", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateCoupons/640156bc99732683325dce7a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //exists
  it("updating a coupon", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateCoupons/640111bc99732683325dce7a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Coupons not found");
    console.log(res.body.message);
  });
  //customer token
  it("updating a coupon", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateCoupons/640156bc99732683325dce7a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a coupon", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateCoupons/640156bc99732683325dce7a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("updating a coupon", async () => {
    const res = await request(app)
      .patch("/updateCoupons/640156bc99732683325dce7a")
      .send({
        code: "OFF150",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
