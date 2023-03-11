const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const PaymentType = require("../models/paymentTypes");

router.post("/addPaymentTypes", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const check = req.body;
    if (!check.paymentMode || !check.createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exists = await PaymentType.findOne({
      $and: [{ paymentMode: check.paymentMode, isDeleted: false }],
    });
    if (exists) {
      return res.status(409).json({ message: "Payment type already exists" });
    }
    const result = await PaymentType.create({
      _id: mongoose.Types.ObjectId(),
      paymentMode: req.body.paymentMode,
      createdBy: req.body.createdBy,
    });
    res.status(200).json({
      message: "Operation successful",
      "Payment Types are": {
        result
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllPaymentTypes", middleware, async (req, res) => {
  try {
    if (
      req.userData.role !== "Admin" &&
      req.userData.role !== "Employee" &&
      req.userData.role !== "Customer"
    ) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await PaymentType.find({ isDeleted: false });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removePaymentTypeByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await PaymentType.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Payment type not found" });
    }
    const result = await PaymentType.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedPaymentTypes", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await PaymentType.find({ isDeleted: true });
    res.status(200).json({ message: "Operation Successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updatePaymentTypes/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await PaymentType.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Payment type not found" });
    }
    const setter = req.body;
    const updates = await PaymentType.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Update Successful", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
