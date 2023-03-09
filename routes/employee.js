const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Employee = require("../models/employee");
const { employeeMiddleware } = require("../middleware/authMiddleware");

router.get("/getAllEmployees", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({ isDeleted: false });
    res.status(200).json({ message: "Operation Successful", docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getEmployeeById/:id", employeeMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) {
      return res.status(400).json({
        message: "employee not found",
      });
    }
    res.status(200).json({
      message: "Operation successful",
      employee: employee,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllEmployees",
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
    });
  }
});

router.post("/registerEmployee", async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  // Validate password format
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long",
    });
  }
  try {
    const exists = await Employee.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (exists) {
      return res.status(400).json({
        message: "Employee email or phone already exists",
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
    const payload = {
      email: email,
      id: result._id,
      role: "Admin",
    };
    const options = {
      expiresIn: "24h", // token will expire in 1 hour
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, options);

    res.status(201).json({
      message: "Registration Successful",
      result,
      token,
      Request: {
        method: "POST",
        url: "http://localhost:3000/employeeLogin",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.patch("/removeEmployeeById/:id", employeeMiddleware, async (req, res) => {
  const employee = await Employee.findOne({ $and: [{ _id: req.params.id }, { isDeleted: false }] });
    if (!employee) {
      return res.status(400).json({
        message: "employee not found",
      });
    }
    try {
      const deletedEmployee = await Employee.updateOne(
        { _id: req.params.id },
        { $set: { isDeleted: true } }
      );
      if (!deletedEmployee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
      res.set("authorization", "");
      res.status(200).json({
        message: "Employee deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/getAllEmployees",
        },
      });
    } catch (err) {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.get("/getAllRemovedEmployees", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({ isDeleted: true });
    res.status(200).json({ docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateEmployee/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    const updates = await Employee.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
