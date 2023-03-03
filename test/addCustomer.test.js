const supertest = require("supertest");
const mongoose = require("mongoose");
const index = require("../index");
const request = supertest(index);

require("dotenv").config();

describe("POST /addCustomer", () => {
    it("should create a product", async () => {
      const res = await request(index).post("/addCustomer").send({
        name: "asd dfg",
        email: "asd@example.in",
        password: "password",
        phone: "1232343454"
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Product 2");
    });
  });