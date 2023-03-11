const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Seats = require("../models/seats");

router.post("/addSeats", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const { seat_type, seat_fare, createdBy } = req.body;
    if (!seat_type || !seat_fare || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exists = await Seats.findOne({ seat_type: seat_type });
    if (exists) {
      return res.status(409).json({ message: "Seat already exists" });
    }
    const result = await Seats.create({
      _id: mongoose.Types.ObjectId(),
      seat_type: req.body.seat_type,
      seat_fare: req.body.seat_fare,
      createdBy: req.body.createdBy,
    });
    res.status(200).json({
      message: "Operation successful",
      "Adding Seat": {
        seat_type: result.seat_type,
        seat_fare: result.seat_fare,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllSeats", middleware, async (req, res) => {
  try {
    if (
      req.userData.role !== "Admin" &&
      req.userData.role !== "Employee" &&
      req.userData.role !== "Customer"
    ) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Seats.find({ isDeleted: false });
    res.status(200).json({
      "All the Seats are ": result,
      Request: {
        method: "POST",
        url: "https://localhost:3000/booking",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeSeatsByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Seats.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Seat not found" });
    }
    const result = await Seats.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ message: "Operation Successful", Removing: result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedSeats", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Seats.find({ isDeleted: true });
    res
      .status(200)
      .json({
        message: "Operation Succesful",
        "All the removed Seats are ": result,
      });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateSeats/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Seats.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Seat not found" });
    }
    const setter = req.body;
    const updates = await Seats.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(201).json({ message: "Update Succesful", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
