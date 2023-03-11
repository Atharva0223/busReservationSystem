const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();

//registeration of a customer
describe("POST /registerCustomer", () => {
  //missing fields
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
    expect(res.statusCode).toBeOneOf([201,409]);
    if(res.statusCode === 201){
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if(res.statusCode === 409){
      expect(res.body.message).toBe("Customer email or phone already exists");
      console.log(res.body.message);
    }
  });
});
//----------------------------------------------------------------------------------------
//getting all the customers in our database
describe("GET /getAllCustomers", () => {
  //should return all customers
  it("should return 200 with all customers", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllCustomers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //unauthorized token
  it("should return 403 Authentication failed", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .get(`/getAllCustomers`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //customer token no access
  it("should return 403 Authentication failed", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get(`/getAllCustomers`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body);
  });
  //Token no provided
  it("should return 403 no token", async () => {
    const res = await request(app).get(`/getAllCustomers`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});

//----------------------------------------------------------------------------------------
describe("PATCH /removeCustomerById/:id", () => {
  //removing the customer from the database
  it("removing the customer", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeCustomerById/64082160f75ecf85b39feccc")
      .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBeOneOf([200,404]);
      if(res.statusCode === 200){
        expect(res.body.message).toBe("Operation successful");
        console.log(res.body.message);
      }
      if(res.statusCode === 404){
        expect(res.body.message).toBe("customer not found");
        console.log(res.body.message);
      }
  });
// check if customer exists
// it("should check if customer exists before deleting", async () => {
//   const token = tokens.employeeToken;
//   const res = await request(app)
//     .patch("/removeCustomerById/64082160f75ecf85b39feabc")
//     .set("Authorization", `Bearer ${token}`);
//   expect(res.statusCode).toBe(400);
//   expect(res.body.message).toBe("customer not found");
//   console.log(res.body);
// });
//check if token is valid
it("should check if token is valid", async () => {
  const token = tokens.unauthorizedToken;
  const res = await request(app)
    .patch("/removeCustomerById/64082160f75ecf85b39feccc")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(403);
  expect(res.body.message).toBe("Authentication failed");
  console.log(res.body);
});
//check if token is not of customner
it("should check if token is authorized", async () => {
  const token = tokens.customerToken;
  const res = await request(app)
    .patch("/removeCustomerById/64082160f75ecf85b39feccc")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(403);
  expect(res.body.message).toBe(
    "Forbidden: You do not have permission to access this resource"
  );
  console.log(res.body);
});
//check if token is passed or not
it("should check if token is passed or not", async () => {
  const res = await request(app).patch(
    "/removeCustomerById/64082160f75ecf85b39feccc"
  );
  expect(res.statusCode).toBe(403);
  expect(res.body.message).toBe("Authentication failed");
  console.log(res.body);
});
});

//----------------------------------------------------------------------------------------
//Get removed customers
describe("GET /getAllRemovedCustomers", () => {
  //should return all employees
  it("should return 200 with all removed customers", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedCustomers")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //unauthorized customer token
  it("should return 403 Forbidden access", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get(`/getAllRemovedCustomers`)
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
      .get(`/getAllRemovedCustomers`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //Token no provided
  it("should return 403 no token", async () => {
    const res = await request(app).get(`/getAllRemovedCustomers`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});

//----------------------------------------------------------------------------------------
//updating customers
describe("PATCH /updateCustomer/:id", () => {
  //updating customer address with customer token
  it("should update address of one customer by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateCustomer/64096cfa1911a2568ceeb6d0")
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "New York",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("customer not found");
      console.log(res.body.message);
    }
  });

  //updating customer name with employee token
  it("should update name of one customer by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateCustomer/64096cfa1911a2568ceeb6d0")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Cena",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("customer not found");
      console.log(res.body.message);
    }
  });

  //updating a customer by id with invalid token
  it("should update one customer by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateCustomer/64096cfa1911a2568ceeb6d0")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "unauthorized token",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});
