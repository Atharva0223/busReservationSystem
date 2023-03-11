const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config();
require("jest-extended");

//Registrations
describe("Employee registration test cases", () => {
  // successful registration
  it("employee should register", async () => {
    const res = await request(app).post("/registerEmployee").send({
      name: "Merry Simpson",
      email: "merry@mail.in",
      phone: "2918304856",
      password: "Password@1",
      role: "Employee",
    });
    expect(res.statusCode).toBeOneOf([201, 409]);
    if (res.statusCode === 201) {
      expect(res.body.message).toBe("Registration Successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 409) {
      expect(res.body.message).toBe("Employee email or phone already exists");
      console.log(res.body.message);
    }
  });
  //missing fields
  it("should return 400 if any fields are missing", async () => {
    const res = await request(app).post("/registerEmployee").send({
      name: "",
      email: "marge@mail.in",
      phone: "1232343453",
      password: "Password@1",
      role: "Employee",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
    console.log(res.body.message);
  });
  //invalid email address
  it("should return 400 if email is invalid", async () => {
    const res = await request(app).post("/registerEmployee").send({
      name: "Marge Simpson",
      email: "margemail.in",
      phone: "1232343453",
      password: "Password@1",
      role: "Employee",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email format");
    console.log(res.body.message);
  });
  //invalid password
  it("should return 400 if password is invalid", async () => {
    const res = await request(app).post("/registerEmployee").send({
      name: "Marge Simpson",
      email: "marge@mail.in",
      phone: "123234453",
      password: "password",
      role: "Employee",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
    );
    console.log(res.body.message);
  });
});

// ---------------------------------------------------------------------------------------
//Get By employee ID

describe("GET /getEmployeeById/:id", () => {
  //employee not found
  it("should return 400 with employee not found", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getEmployeeById/640824b0d296c710c3235831")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("employee not found");
    console.log(res.body.message);
  });
  //bad request invalid id
  it("should return 400 with bad request", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getEmployeeById/6")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Bad request");
    console.log(res.body.message);
  });
  //sucessfully get employee by id
  it("should return 200 with employee by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getEmployeeById/640b18e653edb45d97241e6c")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation successful");
  });
  //unauthorized customer token
  it("should return 403 Forbidden access", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get(`/getEmployeeById/640824b0d296c710c3235837`)
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
      .get(`/getEmployeeById/640824b0d296c710c3235837`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //Token no provided
  it("should return 403 no token", async () => {
    const res = await request(app).get(
      `/getEmployeeById/640824b0d296c710c3235837`
    );
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});
// ---------------------------------------------------------------------------------------
//get all employees
describe("GET /getAllEmployees", () => {
  //should return all employees
  it("should return 200 with all employee", async () => {
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
// ---------------------------------------------------------------------------------------
//removing an eployee by id
describe("PATCH /removeEmployeeById/:id", () => {
  //check if employee exists
  it("should check if employee exists before deleting", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/removeEmployeeById/6405758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Employee deleted");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("employee not found");
      console.log(res.body.message);
    }
  });
  //check if token is valid
  it("should check if token is valid", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/removeEmployeeById/6405758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body);
  });
  //check if token is not unauthorized
  it("should check if token is authorized", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/removeEmployeeById/6405758edf666666d7152093")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //check if token is passed or not
  it("should check if token is passed or not", async () => {
    const res = await request(app).patch(
      "/removeEmployeeById/6405758edf666666d7152093"
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});
// ---------------------------------------------------------------------------------------
//getting all removed employees
describe("GET /getAllRemovedEmployees", () => {
  //should return all employees
  it("should return 200 with all removed employee", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .get("/getAllRemovedEmployees")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Operation Successful");
    console.log(res.body.message);
  });
  //unauthorized customer token
  it("should return 403 Forbidden access", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .get(`/getAllRemovedEmployees`)
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
      .get(`/getAllRemovedEmployees`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //Token no provided
  it("should return 403 no token", async () => {
    const res = await request(app).get(`/getAllRemovedEmployees`);
    expect(res.statusCode).toBe(403); // forbidden
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
});
// ---------------------------------------------------------------------------------------
// updating employee details
describe("PATCH /updateEmployee/:id", () => {
  //updating employee name
  it("should update name of one employee by id", async () => {
    const token = tokens.employeeToken;
    const res = await request(app)
      .patch("/updateEmployee/64054929a5f139ba2e21cf26")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "AST BGF",
      });
    expect(res.statusCode).toBeOneOf([200, 404]);
    if (res.statusCode === 200) {
      expect(res.body.message).toBe("Operation successful");
      console.log(res.body.message);
    }
    if (res.statusCode === 404) {
      expect(res.body.message).toBe("employee not found");
      console.log(res.body.message);
    }
  });
  //updating an employee by id with invalid token
  it("should update one employee by id", async () => {
    const token = tokens.unauthorizedToken;
    const res = await request(app)
      .patch("/updateEmployee/64054929a5f139ba2e21cf26")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "AST DFG",
        role: "Admin",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Authentication failed");
    console.log(res.body);
  });
  //updating an employee by id with customer token
  it("should update one employee by id", async () => {
    const token = tokens.customerToken;
    const res = await request(app)
      .patch("/updateEmployee/64054929a5f139ba2e21cf26")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "AST DFG",
        role: "Admin",
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe(
      "Forbidden: You do not have permission to access this resource"
    );
    console.log(res.body);
  });
});

