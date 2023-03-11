const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Taxes = require("../models/tax");

router.post("/addTaxes", middleware, async (req, res) => {
  if (req.userData.role !== "Admin") {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to access this resource",
    });
  }
  const { state_cross_tax, cgst, sgst, tolls, createdBy } = req.body;
  if (!state_cross_tax || !cgst || !sgst || !tolls || !createdBy) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = await Taxes.find({
    $and: [
      {
        state_cross_tax: req.body.state_cross_tax,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        tolls: req.body.tolls,
      },
    ],
  });
  if (exists) {
    return res.status(409).json({ message: "Tax already exists" });
  }
  
  try {
    const result = await Taxes.create({
      _id: mongoose.Types.ObjectId(),
      state_cross_tax: req.body.state_cross_tax,
      cgst: req.body.cgst,
      sgst: req.body.sgst,
      tolls: req.body.tolls,
      createdBy: req.body.createdBy,
    });
    res.status(200).json({ message: "Tax Added", result: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllTaxes", middleware, async (req, res) => {
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
    const result = await Taxes.find({ isDeleted: false });
    res
      .status(200)
      .json({ message: "Operation Successful", "All the taxes are ": result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeTax/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Taxes.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    console.log(exists);
    if (!exists) {
      return res.status(404).json({ message: "Tax not found" });
    }
    const result = await Taxes.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    return res
      .status(200)
      .json({ message: "Operation Successful", Removing: result });
  } catch (err) {
    return res.status(400).json({ error: "Bad request" });
  }
});

router.get("/getAllremovedTaxes", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Taxes.find({ isDeleted: true });
    res.status(200).json({ "All the taxes that have been removed ": result });
  } catch (error) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateTax/:id", middleware, async (req, res) => {
  if (req.userData.role !== "Admin") {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to access this resource",
    });
  }
  const exists = await Taxes.findOne({
    $and: [{ _id: req.params.id, isDeleted: false }],
  });
  if (!exists) {
    return res.status(404).json({ message: "Tax Not Found" });
  }
  try {
    const setter = req.body;
    const updates = await Taxes.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Updated Successfully", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
