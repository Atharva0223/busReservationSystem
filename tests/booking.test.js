const app = require("../app");
require("../jest_config/jest_connect");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");

//--------------------------------------------------------------------------------------------
//add booking

describe("POST /booking", () => {
  //add booking
  it("Adding a booking", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "6405495ea5f139ba2e21cf29",
        journey: "64017379144184bd8a8e032a",
        passengers: [
          { passenger_name: "asd sdf", age: "25", gender: "male" },
          { passenger_name: "sdf dfg", age: "25", gender: "male" },
          { passenger_name: "dfg fgh", age: "25", gender: "male" },
          { passenger_name: "fgh ghj", age: "25", gender: "male" },
        ],
        bus: "640161aa5298105b58233170",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });

  //all fields are required
  it("Adding a booking", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "",
        journey: "64017379144184bd8a8e032a",
        passengers: [
          { passenger_name: "asd sdf", age: "25", gender: "male" },
          { passenger_name: "sdf dfg", age: "25", gender: "male" },
          { passenger_name: "dfg fgh", age: "25", gender: "male" },
          { passenger_name: "fgh ghj", age: "25", gender: "male" },
        ],
        bus: "640161aa5298105b58233170",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });

  //journey not found
  it("Adding a booking", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "6405495ea5f139ba2e21cf29",
        journey: "64017379169184bd8a8e666a",
        passengers: [
          { passenger_name: "asd sdf", age: "25", gender: "male" },
          { passenger_name: "sdf dfg", age: "25", gender: "male" },
          { passenger_name: "dfg fgh", age: "25", gender: "male" },
          { passenger_name: "fgh ghj", age: "25", gender: "male" },
        ],
        bus: "640161aa5298105b58233170",
        createdBy: "640155d999732683325dce67",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journey not found");
    console.log(res.body.message);
  });

  //unauthorized token
  it("Adding a booking", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "6405495ea5f139ba2e21cf29",
        journey: "64017379169184bd8a8e666a",
        passengers: [
          { passenger_name: "asd sdf", age: "25", gender: "male" },
          { passenger_name: "sdf dfg", age: "25", gender: "male" },
          { passenger_name: "dfg fgh", age: "25", gender: "male" },
          { passenger_name: "fgh ghj", age: "25", gender: "male" },
        ],
        bus: "640161aa5298105b58233170",
        createdBy: "640155d999732683325dce67",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("Adding a booking", async () => {
    const res = await request(app)
      .post("/booking")
      .send({
        customer: "6405495ea5f139ba2e21cf29",
        journey: "64017379169184bd8a8e666a",
        passengers: [
          { passenger_name: "asd sdf", age: "25", gender: "male" },
          { passenger_name: "sdf dfg", age: "25", gender: "male" },
          { passenger_name: "dfg fgh", age: "25", gender: "male" },
          { passenger_name: "fgh ghj", age: "25", gender: "male" },
        ],
        bus: "640161aa5298105b58233170",
        createdBy: "640155d999732683325dce67",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//get booking

describe("GET /getAllBookings", () => {
  //get all bookings
  it("should return all bookings", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });

  //customer token
  it("should return all bookings", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unauthorized token
  it("should return all bookings", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("should return all bookings", async () => {
    const res = await request(app).get("/getAllBookings");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//cancel booking

describe("PATCH /cancelBookingById/:id", () => {
  //cancel
  it("should remove one booking by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/cancelBookingById/6405758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Booking deleted");
    console.log(res.body.message);
  });

  //exists
  it("should remove one booking by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/cancelBookingById/6665758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Booking not found");
    console.log(res.body.message);
  });

  //unauthorized token
  it("should remove one booking by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/cancelBookingById/6665758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("should remove one booking by id", async () => {
    const res = await request(app).patch(
      "/cancelBookingById/6665758edf666666d7152093"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//get cancelled booking

describe("GET /getAllcanceledBookings", () => {
  //get all canceled bookings
  it("should show all the removeed booking", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllcanceledBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });

  //customer token
  it("should show all the removeed booking", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllcanceledBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unauthorized token
  it("should show all the removeed booking", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllcanceledBookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("should show all the removeed booking", async () => {
    const res = await request(app).get("/getAllcanceledBookings");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//update booking

describe("PATCH /updateBooking/:id", () => {
  //update
  it("updating a booking", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateBooking/6405b1bcbbc0edaf7fe1c257")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });

  //exists
  it("updating a booking", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateBooking/6665b1bcbbc0edaf7fe1c257")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Booking not found");
    console.log(res.body.message);
  });

  //unauhtorized token
  it("updating a booking", async () => {
    const token = tokens.unauhtorizedToken;
    const res = await request(app)
      .patch("/updateBooking/6665b1bcbbc0edaf7fe1c257")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("updating a booking", async () => {
    const res = await request(app)
      .patch("/updateBooking/6665b1bcbbc0edaf7fe1c257")
      .send({
        customer: "64057452b8f01219592d8ad4",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
