const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//Adding Stops
//done
describe("POST /addStops", () => {
  //Adding a new Stop
  it("Adding a stop", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "PCMC",
        stop_state: "Pune",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(200);
  });

  //with customer token
  it("Adding a stop", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "PCMC",
        stop_state: "Pune",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //with unauthorized token
  it("Adding a stop", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "PCMC",
        stop_state: "Pune",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //with no token
  it("Adding a stop", async () => {
    const res = await request(app).post("/addStops").send({
      stop_name: "PCMC",
      stop_state: "Pune",
      createdBy: "640ac76632e43f5c6bb23090",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //check if stop exists
  it("Adding a stop", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addStops")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Stop already exists");
    console.log(res.body.message);
  });
});

//---------------------------------------------------------------------------------------
//gett all stops
//done
describe("GET /getAllStops", () => {
  //get all stops
  it("should return all stops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //get all stops customer token
  it("should return all stops", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //get all stops unauthorized token
  it("should return all stops", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //get all stops no token
  it("should return all stops", async () => {
    const res = await request(app).get("/getAllStops");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//---------------------------------------------------------------------------------------
//remove by id
//done
describe("PATCH /removeStopByID/:id", () => {
  //should remove stop by ID
  it("should remove one stop by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeStopByID/640ac767bb097b1cd59bce69")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //check if stop exists
  it("should remove one stop by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeStopByID/640ac767bb097b1cd59bce69")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Stop not found");
    console.log(res.body.message);
  });
  //customer token
  it("should remove one stop by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeStopByID/640ac767bb097b1cd59bce69")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should remove one stop by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeStopByID/640ac767bb097b1cd59bce69")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one stop by id", async () => {
    const res = await request(app).patch(
      "/removeStopByID/640ac767bb097b1cd59bce69"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//---------------------------------------------------------------------------------------
//get all removed
//done
describe("GET /getAllRemovedStops", () => {
  //get all removed
  it("should show all the removed stops", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed stops", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed stops", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedStops")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed stops", async () => {
    const res = await request(app).get("/getAllRemovedStops");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//---------------------------------------------------------------------------------------
//update stops
//done
describe("PATCH /updateStops/:id", () => {
  //update stops by id
  it("updating a stop", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateStops/640ad4b387f8b6fcb14539ae")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra"
      });
    expect(res.statusCode).toBe(200);
  });
  //check if stop exists
  it("updating a stop", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateStops/640ad4b387f8b6fcb14539ae")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra"
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Stop not found");
    console.log(res.body.message);
  });
  //customer token
  it("updating a stop", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateStops/640ad4b387f8b6fcb14539ae")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra"
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a stop", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateStops/640ad4b387f8b6fcb14539ae")
      .set("Authorization", `Bearer ${token}`)
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra"
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //No token
  it("updating a stop", async () => {
    const res = await request(app)
      .patch("/updateStops/640ad4b387f8b6fcb14539ae")
      .send({
        stop_name: "Mumbai",
        stop_state: "Maharashtra"
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
