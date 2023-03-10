const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const {
  employeeMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");

router.get("/getAllCustomers", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Customer.find({ isDeleted: false });
    res.status(200).json({ message: "Operation Successful" ,docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.post("/registerCustomer", async (req, res) => {
  try {
    const { name, email, address, password, phone } = req.body;
    if (!name || !email || !address || !password || !phone) {
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
    const exists = await Customer.findOne({ $or: [{ email: email }, { phone: phone }] });
    if (exists) {
      return res.status(400).json({
        message: "Customer email or phone already exists",
      });
    }
    console.log(exists);
    const hashed = await bcrypt.hash(password, 10);
    const result = await Customer.create({
      _id: mongoose.Types.ObjectId(),
      name: name,
      email: email,
      address: address,
      password: hashed,
      phone: phone,
    });
    const payload = {
      email: email,
      id: result._id,
      role: "Customer",
    };
    
    const token = jwt.sign(payload, process.env.JWT_KEY);

    console.log(token);
    res.status(201).json({
      message: "Registration Successful",
      result,
      token,
      request: {
        method: "POST",
        url: "https://localhost:3000/customerLogin",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
    
  }
});

router.get("/getCustomerById/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.find({ _id: req.params.id });
    if (!customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    res.status(200).json({
      customer: customer,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllCustomers",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeCustomerById/:id", employeeMiddleware, async (req, res) => {
  const customer = await Customer.findOne({ $and: [{ _id: req.params.id }, { isDeleted: false }] });
    if (!customer) {
      return res.status(400).json({
        message: "customer not found",
      });
    }
    try {
      const result = await Customer.updateOne(
        { _id: req.params.id },
        { $set: { isDeleted: true } }
      );
      res.set("authorization", "");
      res.status(200).json({
        message: "customer deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/getAllCustomer",
        },
      });
    } catch (err) {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.get("/getAllRemovedCustomers", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Customer.find({ isDeleted: true });
    res.status(200).json({ message: "Operation Successful", docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateCustomer/:id", authMiddleware, async (req, res) => {
  const customer = await Customer.findOne({ $and: [{ _id: req.params.id }, { isDeleted: false }] });
    if (!customer) {
      return res.status(400).json({
        message: "customer not found",
      });
    }
  
  try {
    const setter = req.body;
    const updates = await Customer.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Update Successful", Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});
module.exports = router;
