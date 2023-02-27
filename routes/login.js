const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Customer = require("../models/customer");
const Employee = require("../models/employee");

router.post("/employeeLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    //employee login
    const employeeExists = await Employee.findOne({ email: email });
    if (employeeExists) {
      const matchEmpPassword = await bcrypt.compare(
        password,
        employeeExists.password
      );
      if (matchEmpPassword) {
        const eToken = jwt.sign(
          { email: email, id: employeeExists._id },
          process.env.JWT_KEY
        );
        const decodedToken = jwt.verify(eToken, process.env.JWT_KEY); // Verify the token
        res.status(201).json({
          Employee: { employeeExists },
          eToken,
          decodedToken, // Add the decoded token to the response
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/customerLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    //employee login
    const customerExists = await Customer.findOne({ email: email });
    if (customerExists) {
      const matchCustPassword = await bcrypt.compare(
        password,
        customerExists.password
      );
      if (matchCustPassword) {
        const cToken = jwt.sign(
          { email: email, id: customerExists._id },
          process.env.JWT_KEY
        );
        const decodedToken = jwt.verify(cToken, process.env.JWT_KEY); // Verify the token
        res.status(201).json({
          Customer: { customerExists },
          cToken,
          decodedToken, // Add the decoded token to the response
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
