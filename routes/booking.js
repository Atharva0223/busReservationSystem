const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Booking = require("../models/booking");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/booking", async (req, res) => {
  const book = req.body;
  try {
    const booking = new Booking({
      _id: mongoose.Types.ObjectId(),
      customer: book.customer,
      bus: book.bus,
      passengers : book.passengers,
      payment: book.payment,
    });
    const result = await booking.save();
    res.status(201).json({ booking: booking });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getAllBookings", authMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({isDeleted: false});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/getAllDeletedBookings", authMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({isDeleted: true});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
