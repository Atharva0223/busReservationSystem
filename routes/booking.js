const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Journey = require("../models/journey");
const Booking = require("../models/booking");

const middleware = require("../middleware/middleware");

router.post("/booking", middleware, async (req, res) => {
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

    //all fields are required
    const book = req.body;
    if (
      !book.customer ||
      !book.passengers ||
      !book.journey ||
      !book.bus ||
      !book.createdBy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const journey = await Journey.findById(book.journey).populate({
      path: "bus",
    });
    //If journey is available
    if (!journey) {
      return res.status(404).json({
        message: "Journey not found",
      });
    }
    //if seats are availabe
    const bus = journey.bus;
    if (bus.available_seats < book.passengers.length) {
      return res.status(400).json({
        message: "Not enough available seats on the bus",
      });
    }
    //if seats availabe then subtracting them from availabe seats
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

    const result =  await booking.save();
    //output
    res.status(200).json({
      message: "Operation successful",
      result: result
    });
  } catch (err) {
    //error
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBookings", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const docs = await Booking.find({ isDeleted: false });
    res.status(200).json({ message: "Operation successful", docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/cancelBookingById/:id", middleware, async (req, res) => {
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
    const exists = await Booking.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const deletedBooking = await Booking.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({
      message: "Booking deleted",
      Deleting: exists
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllcanceledBookings", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const docs = await Booking.find({ isDeleted: true });
    res.status(200).json({ message: "Operation successful", docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateBooking/:id", middleware, async (req, res) => {
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
    const exists = await Booking.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const setter = req.body;
    const updates = await Booking.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(201).json({ Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
