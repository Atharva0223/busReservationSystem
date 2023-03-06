const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { authMiddleware,employeeMiddleware } = require("../middleware/authMiddleware");
require("dotenv").config();

const Payments = require("../models/payments");
const Booking = require("../models/booking");

router.post("/addPayment", authMiddleware, async (req, res) => {
    try {
      const booking = await Booking.findById(req.body.booking)
      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }
      const fare = booking.fare;

      const result = await Payments.create({
        _id: mongoose.Types.ObjectId(),
        booking: req.body.bookingId,
        payment_types: req.body.payment_types,
        fare: fare,
        createdBy: req.body.createdBy
      })
      
  
      res.status(201).json({ result:
      {
        _id: result._id,
        booking: result.booking,
        payment_types: result.payment_types,
        fare: result.fare,
      } });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: "Bad request",
      });
    }
}); 

router.get("/getAllPayments",employeeMiddleware, async (req, res) => {
  try {
    const result = await Payments.find({isDeleted:false})
    res.status(200).json({ result: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removePaymentsByID/:id", employeeMiddleware, async (req, res) => {
    try {
      const result = await Payments.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isDeleted: true } }
      )
      res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.get("/getAllRemovedPayments", employeeMiddleware, async (req, res) => {
    try {
      const result = await Payments.find({ isDeleted: true })
      res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

router.patch("/updatePayments/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
      const updates = await Payments.updateOne(
        { _id: req.params.id },
        { $set:  setter  }
      );
      res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
