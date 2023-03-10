const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Payments = require("../models/payments");
const Booking = require("../models/booking");

router.post("/addPayment", middleware, async (req, res) => {
  try {
    if (
      req.userData.role !== "Admin" &&
      req.userData.role !== "Employee" &&
      req.userData.role !== "Customer"
    ) {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    //find booking
    const book = await Booking.findById(req.body.booking);
    if (!book) {
      return res.status(409).json({
        message: "Booking not found",
      });
    }
    //all fields are required
    const { booking, payment_types, createdBy } = req.body;
    if (!booking || !payment_types || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //if payment already exists
    const exists = await Payments.findOne({
      $and: [{ booking: req.body.booking, createdBy: req.body.createdBy }],
    });
    if (exists) {
      return res.status(409).json({ message: "Payment already exists" });
    }

    const fare = book.fare;

    const result = await Payments.create({
      _id: mongoose.Types.ObjectId(),
      booking: req.body.booking,
      payment_types: req.body.payment_types,
      fare: fare,
      createdBy: req.body.createdBy,
    });

    res.status(200).json({
      result: {
        message: "Operation successful",
        _id: result._id,
        booking: result.booking,
        payment_types: result.payment_types,
        fare: result.fare,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Bad request",
    });
  }
});

router.get("/getAllPayments", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const result = await Payments.find({ isDeleted: false });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removePaymentsByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Payments.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Payment not found" });
    }
    const result = await Payments.findOneAndUpdate(
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

router.get("/getAllRemovedPayments", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const result = await Payments.find({ isDeleted: true });
    res.status(200).json({ message: "Operation Successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updatePayments/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Payments.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Payment not found" });
    }
    const setter = req.body;
    const updates = await Payments.updateOne(
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
