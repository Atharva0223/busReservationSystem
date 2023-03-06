const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { employeeMiddleware, authMiddleware} = require("../middleware/authMiddleware");
require("dotenv").config();

const Seats = require("../models/seats");

router.post("/addSeats",employeeMiddleware, async (req, res) => {
  try {
    const result = await Seats.create({
      _id: mongoose.Types.ObjectId(),
      seat_type: req.body.seat_type,
      seat_fare: req.body.seat_fare,
      createdBy: req.body.createdBy,
    })
    res.status(201).json({ "Adding Seat" : {
      seat_type: result.seat_type,
      seat_fare: result.seat_fare,
    } });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllSeats",authMiddleware, async (req, res) => {
  try {
    const result = await Seats.find({ isDeleted: false })
    res.status(200).json({ "All the Seats are " :  result,
  Request: {
    method: "POST",
    url: "https://localhost:3000/booking",
  }});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeSeatsByID/:id",employeeMiddleware, async (req, res) => {
  try {
    const result = await Seats.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    )
    res.status(200).json({ "Removing": result, "Operation": "Success" });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedSeats",employeeMiddleware, async (req, res) => {
  try {
    const result = await Seats.find({ isDeleted: true })
    res.status(200).json({ "All the removed Seats are ": result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateSeats/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
      const updates = await Seats.updateOne(
        { _id: req.params.id },
        { $set:  setter }
      );
      res.status(201).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
