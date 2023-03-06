const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const {
  customerMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");

const Customer = require("../models/customer");
const Employee = require("../models/employee");

router.post("/employeeLogin",employeeMiddleware, async (req, res) => {
  const { email, password } = req.body;
  try {
    const employeeExists = await Employee.findOne({ email: email });
    if (employeeExists) {
      const matchEmpPassword = await bcrypt.compare(
        password,
        employeeExists.password
      );
      if (matchEmpPassword) {
        const payload = {
          email: email,
          id: employeeExists._id,
          role: "Admin"
        }
        const options = {
          expiresIn: '24h'
        };
        
        const eToken = jwt.sign(payload,process.env.JWT_KEY,options);

        const decodedToken = jwt.verify(eToken, process.env.JWT_KEY);
        res.status(201).json({
          Employee: { employeeExists },
          eToken,
          Request:
          {
            method: "GET",
            url: "http://localhost:3000/"
          }
        });
      } else {
        res.status(401).json({
          message: "Authentication failed: Invalid email or password",
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.post("/customerLogin", customerMiddleware, async (req, res) => {
  const { email, password } = req.body;
  try {
    const customerExists = await Customer.findOne({ email: email });
    console.log(customerExists);
    if (customerExists) {
      const matchCustPassword = await bcrypt.compare(
        password,
        customerExists.password
      );
      if (matchCustPassword) {
        const payload = {
          email: email,
          id: customerExists._id,
          role: "Customer"
        }
        const options = {
          expiresIn: '24h'
        };
        
        const cToken = jwt.sign(payload,process.env.JWT_KEY,options);
        const decodedToken = jwt.verify(cToken, process.env.JWT_KEY); // Verify the token
        res.status(201).json({
          Customer: { customerExists },
          cToken,
          Requests:{
            method: "GET",
            url: "http://localhost:3000/getAllJourney"
          } // Add the decoded token to the response
        });
      } else {
        res.status(401).json({
          message: "Authentication failed: Invalid email or password",
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
