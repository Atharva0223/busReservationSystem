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
    const journey = await Journey.findById(book.journey)
      .populate({
        path: "bus",
        select: "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted",
      })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted");

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
    });

    const result = await booking.save();
    console.log(result);
    res.status(201).json({
      booking: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBookings", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({ isDeleted: false }).select(
      "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted"
    );
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
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
    )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    if (!deletedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res.status(200).json({
      message: "Booking deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllcanceledBookings", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Booking.find({ isDeleted: true })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateBookings/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const updates = await Booking.updateOne(
        { _id: req.params.id },
        { $set: { setter } }
      ).select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted");
      res.status(200).json({ Updated: updates });
    } else {
      res.status(400).json({ error: "Invalid ObjectId" });
    }
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
