const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Coupons = require("../models/coupons");

router.post("/addCoupons", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const check = req.body;
    if (
      !check.name ||
      !check.details ||
      !check.code ||
      !check.value ||
      !check.validity_start ||
      !check.validity_end ||
      !check.createdBy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exists = await Coupons.find({
      $or: [
        {
          name: check.name,
          code: check.code,
          value: check.value,
          createdBy: check.createdBy,
        },
      ],
    });
    if(exists){
      return res.status(409).json({message: "Coupon already exists"});
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

router.get("/getAllCoupons", middleware, async (req, res) => {
  try {
    if (
      req.userData.role !== "Admin" &&
      req.userData.role !== "Employee" &&
      req.userData.role !== "Customer"
    ) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Coupons.find({ isDeleted: false });
    res.status(200).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeCouponByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
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

router.get("/getAllRemovedCoupons", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Coupons.find({ isDeleted: true });
    res.status(200).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateCoupons/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Coupons.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Coupons not found" });
    }
    const setter = req.body;
    const updates = await Coupons.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Operation successful", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
