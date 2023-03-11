const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//--------------------------------------------------------------------------------------------
//add bus
describe("POST /addBus", () => {
  // add a bus
  it("Adding a Bus", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addBus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "CDE",
        plate: "MH01AB3456",
        type_of_bus: "sleaper",
        capacity: "40",
        available_seats: "40",
        seats: "6401568199732683325dce72",
        working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("Bus already exists");
      console.log(res.body.message);
    }
  });

  // all fields are required
  it("Adding a Bus", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addBus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "CDE",
        plate: "MH01AB3456",
        type_of_bus: "sleaper",
        capacity: "40",
        available_seats: "40",
        seats: "",
        working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });

  // customer Token
  it("Adding a Bus", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addBus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "CDE",
        plate: "MH01AB3456",
        type_of_bus: "sleaper",
        capacity: "40",
        available_seats: "40",
        seats: "6401568199732683325dce72",
        working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        createdBy: "640155ad99732683325dce60",
      });
    // expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  // unauthorized Token
  it("Adding a Bus", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addBus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "CDE",
        plate: "MH01AB3456",
        type_of_bus: "sleaper",
        capacity: "40",
        available_seats: "40",
        seats: "",
        working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  // no Token
  it("Adding a Bus", async () => {
    const res = await request(app)
      .post("/addBus")
      .send({
        name: "CDE",
        plate: "MH01AB3456",
        type_of_bus: "sleaper",
        capacity: "40",
        available_seats: "40",
        seats: "",
        working_days: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
        createdBy: "640155ad99732683325dce60",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//get bus

describe("GET /getAllBuses", () => {
  //get all
  it("should return all buses", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//remove bus

describe("PATCH /removeBus/:id", () => {
  //remove
  it("should remove one bus by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeBus/6405bd3f6e73e853d516b547")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Bus not found");
      console.log(res.body.message);
    }
  });

  //customer token
  it("should remove one bus by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeBus/6665bd3f6e73e853d516b547")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unauthorized token
  it("should remove one bus by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeBus/6665bd3f6e73e853d516b547")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("should remove one bus by id", async () => {
    const res = await request(app).patch("/removeBus/6665bd3f6e73e853d516b547");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//get removed bus

describe("GET /getAllRemovedBuses", () => {
  //get all
  it("should show all the removeed buses", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
    console.log(res.body.message);
  });

  //customer token
  it("should show all the removeed buses", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllRemovedBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unauthorized token
  it("should show all the removeed buses", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllRemovedBuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("should show all the removeed buses", async () => {
    const res = await request(app).get("/getAllRemovedBuses");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});

//--------------------------------------------------------------------------------------------
//update bus

describe("PATCH /updateBus/:id", () => {
  //update
  it("updating a bus", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateBus/6405bf252f617b008e7dcf5f")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type_of_bus: "seater",
        seats: "6401567599732683325dce6e",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Bus not found");
      console.log(res.body.message);
    }
  });

  //customer token
  it("updating a bus", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateBus/6405bf252f617b008e7dcf5f")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type_of_bus: "seater",
        seats: "6661567599732683325dce6e",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unuthorized token
  it("updating a bus", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateBus/6405bf252f617b008e7dcf5f")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type_of_bus: "seater",
        seats: "6661567599732683325dce6e",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //no token
  it("updating a bus", async () => {
    const res = await request(app)
      .patch("/updateBus/6405bf252f617b008e7dcf5f")
      .send({
        type_of_bus: "seater",
        seats: "6661567599732683325dce6e",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});