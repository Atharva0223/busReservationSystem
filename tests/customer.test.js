const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//registeration of a customer
describe("POST /registerCustomer", () => {  //missing fields
  it("should return 400 if any fields are missing", async () => {
    const res = await request(app).post("/registerCustomer").send({
      name: "",
      email: "marge@mail.in",
      address: "Pune",
      password: "",
      phone: "1232343453",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //email or phone already exists
  it("should return 400 if email or phone already exists", async () => {
    const res = await request(app).post("/registerCustomer").send({
      name: "Bryan Griffin",
      email: "bryan@mail.in",
      address: "Texas",
      password: "Password@1",
      phone: "1232343454",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Customer email or phone already exists");
    console.log(res.body.message);
  });
  //invalid email address
  it("should return 400 if email is invalid", async () => {
    const res = await request(app).post("/registerCustomer").send({
      name: "Bryan Griffin",
      email: "bryanmail.in",
      address: "Texas",
      password: "Password@1",
      phone: "1232343454",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email format");
    console.log(res.body.message);
  });
  //invalid password
  it("should return 400 if password is invalid", async () => {
    const res = await request(app).post("/registerCustomer").send({
      name: "Bryan Griffin",
      email: "bryan@mail.in",
      address: "Texas",
      password: "password",
      phone: "1232343454",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
    );
    console.log(res.body.message);
  });
  //successful registration
  it("employee should register", async () => {
    const res = await request(app).post("/registerCustomer").send({
      name: "Arya Stark",
      email: "arya@mail.in",
      address: "Texas",
      password: "Password@1",
      phone: "4930955739",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Registration Successful");
    console.log(res.body.message);
  });
});
//----------------------------------------------------------------------------------------
//getting all the customers in our database
describe("GET /getAllCustomers", () => {
    //should return all employees
    it("should return 200 with all customers", async () => {
      const token = tokens.employeeToken;
      const res = await request(app)
        .get("/getAllEmployees")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Operation Successful");
      console.log(res.body.message);
    });
    //unauthorized customer token
    it("should return 403 Forbidden access", async () => {
      const token = tokens.customerToken;
      const res = await request(app)
        .get(`/getAllEmployees`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(403); // forbidden
      expect(res.body.message).toBe(
        "Forbidden: You do not have permission to access this resource"
      );
      console.log(res.body);
    });
    //unauthorized token
    it("should return 403 Authentication failed", async () => {
      const token = tokens.unauthorizedToken;
      const res = await request(app)
        .get(`/getAllEmployees`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(403); // forbidden
      expect(res.body.message).toBe("Authentication failed");
      console.log(res.body);
    });
    //Token no provided
    it("should return 403 no token", async () => {
      const res = await request(app).get(`/getAllEmployees`);
      expect(res.statusCode).toBe(403); // forbidden
      expect(res.body.message).toBe("Authentication failed");
      console.log(res.body);
    });  
});

//----------------------------------------------------------------------------------------
// describe("PATCH /removeCustomerById/:id", () => {
//   it("should remove one customer by id", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//     .patch("/removeCustomerById/6405c34c925e2181f7cae6d2")
//     .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /getAllRemovedCustomers", () => {
  it("should show all the removed customer", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedCustomers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

// describe("PATCH /updateCustomer/:id", () => {
//   it("updating a customer", async () => {
//     const token = tokens.employeeToken;
//     const res = await request(app)
//       .patch("/updateCustomer/64057452b8f01219592d8ad4")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         address: "Antartica",
//       });
//     expect(res.statusCode).toBe(201);
//   });
// });
