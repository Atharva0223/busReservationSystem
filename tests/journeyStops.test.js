const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//add journeystops
describe("POST /addJourneyStops", () => {
  //add journey stops
  it("Adding a journeyStop", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addJourneyStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        journey: "64017379144184bd8a8e032a",
        stops: "640156cc99732683325dce7c",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("JourneyStop already exists");
      console.log(res.body.message);
    }
  });
  //customer token
  it("Adding a journeyStop", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addJourneyStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        journey: "64017379144184bd8a8e032a",
        stops: "640156cc99732683325dce7c",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a journeyStop", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addJourneyStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        journey: "64017379144184bd8a8e032a",
        stops: "640156cc99732683325dce7c",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a journeyStop", async () => {
    const res = await request(app).post("/addJourneyStops").send({
      journey: "64017379144184bd8a8e032a",
      stops: "640156cc99732683325dce7c",
      createdBy: "640155ad99732683325dce60",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------
//get all journey stops

describe("GET /getAllJourneyStops", () => {
  //get all journey stops
  it("should return all journeysStops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should return all journeysStops", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should return all journeysStops", async () => {
    const res = await request(app).get("/getAllJourneyStops");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------
//remove journey stops

describe("PATCH /removeJourneyStopsByID/:id", () => {
  //successful
  it("should remove one journeyStop by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeJourneyStopsByID/6405cbb573e1ea6594c0bd48")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("JourneyStop not found");
      console.log(res.body.message);
    }
  });
  //customer token
  it("should remove one journeyStop by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeJourneyStopsByID/6405cbb573e1ea6594c0bd48")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should remove one journeyStop by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeJourneyStopsByID/6405cbb573e1ea6594c0bd48")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one journeyStop by id", async () => {
    const res = await request(app).patch(
      "/removeJourneyStopsByID/6405cbb573e1ea6594c0bd48"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//----------------------------------------------------------------------------------
//remove journey stops

describe("GET /getAllRemovedJourneyStops", () => {
  //get all removed
  it("should show all the removed journeys", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed journeys", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed journeys", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedJourneyStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed journeys", async () => {
    const res = await request(app)
      .get("/getAllRemovedJourneyStops")
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

