const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const Coupons = require("../models/coupons");

router.post("/addCoupons", employeeMiddleware, async (req, res) => {
  try {
    const {
      name,
      details,
      code,
      value,
      validity_start,
      validity_end,
      createdBy,
    } = req.body;

    if (
      !name ||
      !details ||
      !code ||
      !value ||
      !validity_start ||
      !validity_end ||
      !createdBy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await Coupons.create({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      details: req.body.details,
      code: req.body.code,
      value: req.body.value,
      validity_start: req.body.validity_start,
      validity_end: req.body.validity_end,
      createdBy: req.body.createdBy,
    });
    res.status(201).json({
      Coupon: {
        name: result.name,
        details: result.details,
        code: result.code,
        value: result.value,
        validity_start: result.validity_start,
        validity_end: result.validity_end,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllCoupons", authMiddleware, async (req, res) => {
  try {
    const result = await Coupons.find({ isDeleted: false });
    res.status(200).json({ message : "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeCouponByID/:id", employeeMiddleware, async (req, res) => {
  try {
    const exists = await Coupons.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Coupons not found" });
    }
    const result = await Coupons.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedCoupons", employeeMiddleware, async (req, res) => {
  try {
    const result = await Coupons.find({ isDeleted: true });
    res.status(200).json({ message : "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateCoupons/:id", employeeMiddleware, async (req, res) => {
  try {
    const exists = await Coupons.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Coupons not found" });
    }
    const setter = req.body;
    const updates = await Coupons.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Operation successful", Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
