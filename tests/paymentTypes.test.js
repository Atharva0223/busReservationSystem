const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

describe("POST /addPaymentTypes", () => {
  //add PaymentTypes
  it("Adding a PaymentTypes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addPaymentTypes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Cash Mail",
        createdBy: "6409d45beecfaaf561ae6c94",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //PaymentTypes already exists
  it("Adding a PaymentTypes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addPaymentTypes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Cash Mail",
        createdBy: "6409d45beecfaaf561ae6c94",
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Payment type already exists");
    console.log(res.body.message);
  });
  //all fields are required
  it("Adding a PaymentTypes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addPaymentTypes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Cash Mail",
        createdBy: "",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //customer token
  it("Adding a PaymentTypes", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addPaymentTypes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Cash Mail",
        createdBy: "6409d45beecfaaf561ae6c94",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a PaymentTypes", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addPaymentTypes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Cash Mail",
        createdBy: "6409d45beecfaaf561ae6c94",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a PaymentTypes", async () => {
    const res = await request(app).post("/addPaymentTypes").send({
      paymentTypes: "Cash Mail",
      createdBy: "6409d45beecfaaf561ae6c94",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------
//get all payment types
describe("GET /getAllPaymentTypes", () => {
  //get all payment types
  it("should return all paymentTypes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //unauthorized token
  it("should return all paymentTypes", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should return all paymentTypes", async () => {
    const res = await request(app).get("/getAllPaymentTypes");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//remove by id
describe("PATCH /removePaymentTypeByID/:id", () => {
  //remove
  it("should remove one by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removePaymentTypeByID/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`);
    //   expect(res.statusCode).toBe(200);
  });
  //check if exists ?
  it("should remove one by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removePaymentTypeByID/ad05cfc3d3b81223551d4624")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Payment type not found");
    console.log(res.body.message);
  });
  //customer token
  it("should remove one  by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removePaymentTypeByID/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should remove one seat by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removePaymentTypeByID/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one seat by id", async () => {
    const res = await request(app).patch(
      "/removePaymentTypeByID/6405cfc3d3b81029551d4624"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get removed
describe("GET /getAllRemovedPaymentTypes", () => {
  //get all removed
  it("should show all the removed", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed ", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedPaymentTypes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed", async () => {
    const res = await request(app).get("/getAllRemovedPaymentTypes");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//update
describe("PATCH /updatePaymentTypes/:id", () => {
  //update by id
  it("updating a payment type", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updatePaymentTypes/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Bond",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Update Successful");
    console.log(res.body.message);
  });
  //check if exists
  it("updating a payment type", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updatePaymentTypes/6450cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Bond",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Payment type not found");
    console.log(res.body.message);
  });
  //customer token
  it("updating a payment type", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updatePaymentTypes/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Bond",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a payment type", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updatePaymentTypes/6405cfc3d3b81029551d4624")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentTypes: "Bond",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //No token
  it("updating a payment type", async () => {
    const res = await request(app)
      .patch("/updatePaymentTypes/6405cfc3d3b81029551d4624")
      .send({
        paymentTypes: "Bond",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
