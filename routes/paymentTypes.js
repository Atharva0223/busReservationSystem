const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { employeeMiddleware } = require("../middleware/authMiddleware");
require("dotenv").config();

const PaymentType = require("../models/paymentTypes");

router.post("/addPaymentTypes", employeeMiddleware, async (req, res) => {
  try {
    const result = await PaymentType.create({
      _id: mongoose.Types.ObjectId(),
      paymentTypes: req.body.paymentTypes,
      createdBy: req.body.createdBy,
    });
    res.status(201).json({
      "Payment Types are": {
        paymentTypes: result.paymentTypes,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllPaymentTypes", async (req, res) => {
  try {
    const result = await PaymentType.find({ isDeleted: false });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removePaymentTypeByID/:id", employeeMiddleware, async (req, res) => {
    try {
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
  }
);

router.get("/getAllRemovedPaymentTypes", employeeMiddleware, async (req, res) => {
    try {
      const result = await PaymentType.find({ isDeleted: true });
      res.status(200).json({ result });
    } catch (err) {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.patch("/updatePaymentTypes/:id", employeeMiddleware, async (req, res) => {
    try {
      const setter = req.body;
      const updates = await PaymentType.updateOne(
        { _id: req.params.id },
        { $set: setter }
      );
      res.status(201).json({ Updated: updates });
    } catch {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

module.exports = router;
