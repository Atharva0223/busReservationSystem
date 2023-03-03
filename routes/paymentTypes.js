const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const PaymentType = require("../models/paymentTypes");

router.post("/addPaymentTypes",employeeMiddleware, async (req, res) => {
  try {
    const result = await PaymentType.create({
      _id: mongoose.Types.ObjectId(),
      payment_type: req.body.payment_type,
    })
    res.status(201).json({ "Payment Types are": {
      payment_type: req.body.payment_type
    } });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllPaymentTypes", async (req, res) => {
  try {
    const result = await PaymentType.find()
      .populate("payment_type", "_id payment_type")
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ result: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removePaymentTypeByID/:id",employeeMiddleware, async (req, res) => {
  try {
    const result = await PaymentType.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedPaymentTypes",employeeMiddleware, async (req, res) => {
  try {
    const result = await PaymentType.find({ isDeleted: true })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updatePaymentType/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const updates = await PaymentType.updateOne(
        { _id: req.params.id },
        { $set: { setter } }
      );
      res.status(200).json({Updated: updates});
    //else
    }
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
