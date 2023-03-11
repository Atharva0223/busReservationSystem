const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//Adding taxes
describe("POST /addTaxes", () => {
  //adding tax
  it("Adding a tax", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addTaxes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: "800",
        cgst: "0.9",
        sgst: "0.9",
        tolls: "800",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBeOneOf([200, 409]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("Tax already exists");
      console.log(res.body.message);
    }
  });
  //with customer token
  it("Adding a tax", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .post("/addTaxes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: "800",
        cgst: "0.9",
        sgst: "0.9",
        tolls: "800",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //with unauthorized token
  it("Adding a tax", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .post("/addTaxes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: "800",
        cgst: "0.9",
        sgst: "0.9",
        tolls: "800",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //all fields are required
  it("Adding a tax", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .post("/addTaxes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: "",
        cgst: "0.9",
        sgst: "",
        tolls: "800",
        createdBy: "640ac76632e43f5c6bb23090",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
});
//----------------------------------------------------------------------------------------
//Get all Taxes
describe("GET /getAllTaxes", () => {
  //get all taxes successfully employee token
  it("should return all taxes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body);
  });
  //get all taxes successfully cstomer token
  it("should return all taxes", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //get all taxes unauthorized token
  it("should return all taxes", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //get all taxes no token passed
  it("should return all taxes", async () => {
    const res = await request(app).get("/getAllTaxes");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//----------------------------------------------------------------------------------------
//remove tax from database
describe("PATCH /removeTax/:id", () => {
  //sucessfully remove tax from database
  it("should remove one tax by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeTax/640ad4b0467aeeca16a899f7")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Tax not found");
      console.log(res.body.message);
    }
  });

  //Customer token
  it("should remove one tax by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeTax/640ad4b0467aeeca16a899f7")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //unauthorized token
  it("should remove one tax by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeTax/640ad4b0467aeeca16a899f7")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should remove one tax by id", async () => {
    const res = await request(app).patch("/removeTax/640ad4b0467aeeca16a899f7");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//----------------------------------------------------------------------------------------
//get removed tax from database
describe("GET /getAllremovedTaxes", () => {
  //get removed tax from database
  it("should show all the removed taxes", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllremovedTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
  //customer token
  it("should show all the removed taxes", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get("/getAllremovedTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });
  //unauthorized token
  it("should show all the removed taxes", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get("/getAllremovedTaxes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
  //no token
  it("should show all the removed taxes", async () => {
    const res = await request(app).get("/getAllremovedTaxes");
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
//----------------------------------------------------------------------------------------
//get removed tax from database
describe("PATCH /updateTax/:id", () => {
  //updating a tax
  it("updating a tax", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateTax/640ad4b1467aeeca16a899fc")
      .set("Authorization", `Bearer ${token}`)
      .send({
        sgst: "0.9",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("Tax Not Found");
      console.log(res.body.message);
    }
  });
  //updating a tax with customer token
  it("updating a tax", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateTax/640ad4b1467aeeca16a899fc")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: 300,
        tolls: 300,
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body.message);
  });

  //updating a tax with unauthorized token
  it("updating a tax", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateTax/640ad4b1467aeeca16a899fc")
      .set("Authorization", `Bearer ${token}`)
      .send({
        state_cross_tax: 300,
        tolls: 300,
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });

  //updating a tax with no token
  it("updating a tax", async () => {
    const res = await request(app)
      .patch("/updateTax/640ad4b1467aeeca16a899fc")
      .send({
        state_cross_tax: 300,
        tolls: 300,
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body.message);
  });
});
