const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//add seats
//done
describe("POST /addSeats", () => {
  //add seat
  it("Adding a seat", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addSeats")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "semi seater",
        seat_fare: "900",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(200);
  });
  //Seat already exists
  it("Adding a seat", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addSeats")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "semi seater",
        seat_fare: "900",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Seat already exists");
    console.log(res.body.message);
  });
  //all fields are required
  it("Adding a seat", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addSeats")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "",
        seat_fare: "900",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //customer token
  it("Adding a seat", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addSeats")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "ASD",
        seat_fare: "900",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("Adding a seat", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addSeats")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "ASD",
        seat_fare: "900",
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("Adding a seat", async () => {
    const res = await request(app).post("/addSeats").send({
      seat_type: "ASD",
      seat_fare: "900",
      createdBy: "640155ad99732683325dce60",
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//-------------------------------------------------------------------------------
//get all seats
//done
describe("GET /getAllSeats", () => {
  //get all seats
  it("should return all seats", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //unauthorized token
  it("should return all seats", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should return all seats", async () => {
    const res = await request(app).get("/getAllSeats");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//-------------------------------------------------------------------------------
//remove seats
//done
describe("PATCH /removeSeatsByID/:id", () => {
  //remove seats
  it("should remove one seat by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeSeatsByID/640ad4b12da8ae7fbd17ccfc")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //check if seat exists ?
  it("should remove one seat by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeSeatsByID/666ad4b12da8ae7fbd17ccfc")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Seat not found");
    console.log(res.body.message);
  });
  //customer token
  it("should remove one seat by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeSeatsByID/640ad4b12da8ae7fbd17ccfc")
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
      .patch("/removeSeatsByID/640ad4b12da8ae7fbd17ccfc")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one seat by id", async () => {
    const res = await request(app).patch(
      "/removeSeatsByID/640ad4b12da8ae7fbd17ccfc"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//-------------------------------------------------------------------------------
//get removed seats
//done
describe("GET /getAllRemovedSeats", () => {
  //get all removed seats
  it("should show all the removed seats", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Succesful");
    console.log(res.body.message);
  });
  //customer token
  it("should show all the removed seats", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed seats", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedSeats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed seats", async () => {
    const res = await request(app).get("/getAllRemovedSeats");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//-------------------------------------------------------------------------------
//updae seats
describe("PATCH /updateSeats/:id", () => {
  //update seats by id
  it("updating a seat", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateSeats/640ad4b10847556a90e46c96")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "sleaper",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Update Succesful");
    console.log(res.body.message);
  });
  //check if seats exists
  it("updating a seat", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateSeats/640ad4b10847556a90e46c96")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "sleaper",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Seat not found");
    console.log(res.body.message);
  });
  //customer token
  it("updating a seat", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateSeats/640ad4b10847556a90e46c96")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "sleaper",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("updating a seat", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateSeats/640ad4b10847556a90e46c96")
      .set("Authorization", `Bearer ${token}`)
      .send({
        seat_type: "sleaper",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //No token
  it("updating a seat", async () => {
    const res = await request(app)
      .patch("/updateSeats/640ad4b10847556a90e46c96")
      .send({
        seat_type: "sleaper",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
