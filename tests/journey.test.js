const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//adding journey

describe("POST /addJourney", () => {
  //adding
  it("Adding a journey", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addJourney")
      .set("Authorization", `Bearer ${token}`)
      .send({
        from: "Pune",
        to: "Bhilai",
        bus: "640161aa5298105b58233170",
        tax: "6401569b99732683325dce76",
        coupons: "640156bc99732683325dce7a",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("Journey already exists");
      console.log(res.body.message);
    }
  });
  //all fields are required
  it("Adding a journey", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addJourney")
      .set("Authorization", `Bearer ${token}`)
      .send({
        from: "Pune",
        to: "Bhilai",
        bus: "",
        tax: "",
        coupons: "640156bc99732683325dce7a",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //customer token
  it("Adding a journey", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addJourney")
      .set("Authorization", `Bearer ${token}`)
      .send({
        from: "Pune",
        to: "Bhilai",
        bus: "640161aa5298105b58233170",
        tax: "6401569b99732683325dce76",
        coupons: "640156bc99732683325dce7a",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a journey", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addJourney")
      .set("Authorization", `Bearer ${token}`)
      .send({
        from: "Pune",
        to: "Bhilai",
        bus: "640161aa5298105b58233170",
        tax: "6401569b99732683325dce76",
        coupons: "640156bc99732683325dce7a",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a journey", async () => {
    const res = await request(app).post("/addJourney").send({
      from: "Pune",
      to: "Bhilai",
      bus: "640161aa5298105b58233170",
      tax: "6401569b99732683325dce76",
      coupons: "640156bc99732683325dce7a",
      createdBy: "640155ad99732683325dce60",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get all journey

describe("GET /getAllJourneys", () => {
  //get all
  it("should return all journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllJourneys")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should return all journeys", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllJourneys")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should return all journeys", async () => {
    const res = await request(app).get("/getAllJourneys");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//remove journey

describe("PATCH /removeJourneyByID/:id", () => {
  //remove one
  it("should remove one journey by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeJourneyByID/6405c884143d674ba3ba9708")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Journey not found");
      console.log(res.body.message);
    }
  });
  //customer token
  it("should remove one journey by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeJourneyByID/6405c884143d674ba3ba9708")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should remove one journey by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeJourneyByID/6405c884143d674ba3ba9708")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one journey by id", async () => {
    const res = await request(app).patch(
      "/removeJourneyByID/6405c884143d674ba3ba9708"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//get removed journey

describe("GET /getAllRemovedJourney", () => {
  //get removed
  it("should show all the removed journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedJourney")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed journeys", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedJourney")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden: You do not have permission to access this resource");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed journeys", async () => {
    const token = tokens.unauthorized;
    const res = await request(app)
      .get("/getAllRemovedJourney")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed journeys", async () => {
    const res = await request(app)
      .get("/getAllRemovedJourney")
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------------
//update journey

describe("PATCH /updateJourneys/:id", () => {
  //update
  it("updating a journey", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateJourneys/64017379144184bd8a8e032a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus: "6405bf252f617b008e7dcf5f",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Journey not found");
      console.log(res.body.message);
    }
  });
  //customer token
  it("updating a journey", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateJourneys/64017379144184bd8a8e032a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus: "6405bf252f617b008e7dcf5f",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a journey", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateJourneys/64017379144184bd8a8e032a")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus: "6405bf252f617b008e7dcf5f",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("updating a journey", async () => {
    const res = await request(app)
      .patch("/updateJourneys/64017379144184bd8a8e032a")
      .send({
        bus: "6405bf252f617b008e7dcf5f",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
