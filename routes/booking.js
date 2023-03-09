const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bus = require("../models/bus");
const Journey = require("../models/journey");
const Booking = require("../models/booking");

const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");

router.post("/booking", authMiddleware, async (req, res) => {
  const book = req.body;
  try {
    const journey = await Journey.findById(book.journey).populate({
      path: "bus",
    });

    if (!journey) {
      return res.status(404).json({
        message: "Journey not found",
      });
    }

    const bus = journey.bus;
    if (bus.available_seats < book.passengers.length) {
      return res.status(400).json({
        message: "Not enough available seats on the bus",
      });
    }

    bus.available_seats -= book.passengers.length;
    await bus.save();

    const booking = new Booking({
      _id: mongoose.Types.ObjectId(),
      customer: book.customer,
      passengers: book.passengers,
      seats: book.seats,
      bus: book.bus,
      fare: journey.fare * book.passengers.length,
      createdBy: book.createdBy,
    });

    const result = await booking.save();
    res.status(201).json({
      booking: result,
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBookings", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({ isDeleted: false });
    res.status(200).json({ docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/cancelBookingById/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBooking = await Booking.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    if (!deletedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res.status(200).json({
      message: "Booking deleted",
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllcanceledBookings", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({ isDeleted: true });
    res.status(200).json({ docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateBooking/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    const updates = await Booking.updateOne(
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
