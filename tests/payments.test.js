const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();
//Add payment
describe("POST /addPayment", () => {
  //add
  it("Adding a Payment", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addPayment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        booking: "6405b1bcbbc0edaf7fe1c257",
        payment_types: "Credit card",
        createdBy: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("Booking not found");
      console.log(res.body.message);
    }
  });
  //all fields are required
  it("Adding a Payment", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addPayment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        booking: "6405b1bcbbc0edaf7fe1c257",
        payment_types: "",
        createdBy: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a Payment", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addPayment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        booking: "6405b1bcbbc0edaf7fe1c257",
        payment_types: "Credit card",
        createdBy: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a Payment", async () => {
    const res = await request(app).post("/addPayment").send({
      booking: "6405b1bcbbc0edaf7fe1c257",
      payment_types: "Credit card",
      createdBy: "64057452b8f01219592d8ad4",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//---------------------------------------------------------------------------------------
//get all payments
describe("GET /getAllPayments", () => {
  //get all payments
  it("should return all payments", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //customer token
  it("should return all payments", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should return all payments", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
    //no token
    it("should return all payments", async () => {
      const res = await request(app)
        .get("/getAllPayments")
      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Authentication failed");
      console.log(res.body.message);
    });
});

//----------------------------------------------------------------------------------------
//remove payment by id

describe("PATCH /removePaymentsByID/:id", () => {
  //remove
  it("should remove one by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removePaymentsByID/6409e3ad5ab06fb4e19adb94")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Payment not found");
      console.log(res.body.message);
    }
  });
  //customer token
  it("should remove one  by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removePaymentsByID/6409e3ad5ab06fb4e19adb94")
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
      .patch("/removePaymentsByID/6409e3ad5ab06fb4e19adb94")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one seat by id", async () => {
    const res = await request(app).patch(
      "/removePaymentsByID/6409e3ad5ab06fb4e19adb94"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get removed

describe("GET /getAllRemovedPayments", () => {
  //get all removed
  it("should show all the removed journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed journeys", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed journeys", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedPayments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed journeys", async () => {
    const res = await request(app)
      .get("/getAllRemovedPayments")
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//update

describe("PATCH /updatePayments/:id", () => {
  // //update by id
  it("updating a payment", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updatePayments/6405cdc8d4e337f1e6bf19ad")
      .set("Authorization", `Bearer ${token}`)
      .send({
        payment_types: "Debit card",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Payment not found");
      console.log(res.body.message);
    }
  });
  //customer token
  it("updating a payment", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updatePayments/6405cdc8d4e337f1e6bf19ad")
      .set("Authorization", `Bearer ${token}`)
      .send({
        payment_types: "Debit card",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a payment", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updatePayments/6405cdc8d4e337f1e6bf19ad")
      .set("Authorization", `Bearer ${token}`)
      .send({
        payment_types: "Debit card",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("updating a payment", async () => {
    const res = await request(app)
      .patch("/updatePayments/6405cdc8d4e337f1e6bf19ad")
      .send({
        payment_types: "Debit card",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
