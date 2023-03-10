const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const Payments = require("../models/payments");
const Booking = require("../models/booking");

router.post("/addPayment", authMiddleware, async (req, res) => {
  try {
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
      $and: [{ booking: res.body.booking, createdBy: res.body.createdBy }],
    });
    if (!exists) {
      return res.statusCode(409).json({ message: "Payment already exists" });
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
    res.status(400).json({
      message: "Bad request",
    });
  }
});

router.get("/getAllPayments", employeeMiddleware, async (req, res) => {
  try {
    const result = await Payments.find({ isDeleted: false });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch(
  "/removePaymentsByID/:id",
  employeeMiddleware,
  async (req, res) => {
    try {
      const exists = await Payments.findOne({
        $and: [{_id: req.params.id, isDeleted: false}],
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
  }
);

router.get("/getAllRemovedPayments", employeeMiddleware, async (req, res) => {
  try {
    const result = await Payments.find({ isDeleted: true });
    res.status(200).json({ message: "Operation Successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updatePayments/:id", employeeMiddleware, async (req, res) => {
  try {
    const exists = await Payments.findOne({$and: [ {id: req.params.id, isDeleted: false} ]});
    if(!exists) {
      return res.status(404).json({message:"Payment not found"});
    }
    const setter = req.body;
    const updates = await Payments.updateOne(
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
