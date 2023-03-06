const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { employeeMiddleware } = require("../middleware/authMiddleware");
require("dotenv").config();

const Taxes = require("../models/tax");

router.post("/addTaxes", employeeMiddleware, async (req, res) => {
  try {
    const result = await Taxes.create({
      _id: mongoose.Types.ObjectId(),
      state_cross_tax: req.body.state_cross_tax,
      cgst: req.body.cgst,
      sgst: req.body.sgst,
      tolls: req.body.tolls,
      createdBy: req.body.createdBy
    });
    res.status(201).json({
      "Adding tax": {
        state_cross_tax: req.body.state_cross_tax,
        cgst: result.cgst,
        sgst: result.sgst,
        tolls: result.tolls,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllTaxes", employeeMiddleware, async (req, res) => {
  try {
    const result = await Taxes.find({ isDeleted: false })
    res.status(200).json({ "All the taxes are ": result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeTax/:id", employeeMiddleware, async (req, res) => {
  try {
    const result = await Taxes.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    )
    res.status(200).json({ Removing: result, Operation: "Success" });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});


router.get("/getAllremovedTaxes", employeeMiddleware, async (req, res) => {
  try {
    const result = await Taxes.find({ isDeleted: true })
    res.status(200).json({ "All the taxes that have been removed ": result });
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateTax/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
      const updates = await Taxes.updateOne(
        { _id: req.params.id },
        { $set: setter }
      );
      res.status(201).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
