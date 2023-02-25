const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Customer = require("../models/customer");
const Employee = require("../models/employee");
const auth = require("../middleware/authMiddleware");

router.post("/addEmployee", async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const exists = await Employee.findOne({ email: email });
    if (exists) {
      return res.status(400).json({
        message: "Employee email already exists",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const result = await Employee.create({
      _id: mongoose.Types.ObjectId(),
      name: name,
      email: email,
      phone: phone,
      password: hashed,
      role: role,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY
    );
    res.status(201).json({
      result,
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/addCustomer", async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const exists = await Customer.findOne({ email: email });
    if (exists) {
      return res.status(400).json({
        message: "Customer email already exists",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const result = await Customer.create({
      _id: mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: hashed,
      phone: phone,g
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY
    );
    res.status(201).json({
      result,
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
