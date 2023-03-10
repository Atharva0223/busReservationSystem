const app = require("../app");
const request = require("supertest");
const tokens = require("../jest_config/Tokens");
require("dotenv").config()

describe("POST /addPaymentTypes", () => {
    //add PaymentTypes
    it("Adding a PaymentTypes", async () => {
      const token = tokens.employeeToken;
      const res = await request(app)
        .post("/addPaymentTypes")
        .set("Authorization", `Bearer ${token}`)
        .send({
          paymentTypes: "Cash",
          createdBy: "6409d45beecfaaf561ae6c94",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Operation Successful");
      console.log(res.body.message);
    });
});