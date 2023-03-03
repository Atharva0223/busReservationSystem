const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Employee = require("../models/employee");
const {
  employeeMiddleware,
} = require("../middleware/authMiddleware");

router.get("/getAllEmployees", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({ isDeleted: false })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.post("/registerEmployee", async (req, res) => {
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
      result,
      token,
      Request: {
        method: "POST",
        url: "http://localhost:3000/employeeLogin",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getEmployeeById/:id", employeeMiddleware, async (req, res) => {
  try {
    const employee = await Employee.find({ _id: req.params.id })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    if (!employee) {
      return res.status(404).json({
        message: "employee not found",
      });
    }
    res.status(200).json({
      employee: employee,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllEmployees",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch(
  "/removeEmployeeById/:id",
  employeeMiddleware,
  async (req, res) => {
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
      console.log(err);
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.get("/getAllRemovedEmployees", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({ isDeleted: true })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy")
      .lean();
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
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
      { $set: { setter } }
    );
    res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});
module.exports = router;
