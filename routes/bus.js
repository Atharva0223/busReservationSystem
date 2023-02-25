const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Bus = require("../models/bus");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllBuses", async (req, res) => {
  try {
    const docs = await Bus.find();
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/addBus", authMiddleware, async (req, res) => {
  try {
    const bus = await Bus.find({ plate: req.params.plate });
    if (!bus) {
      return res.status(404).json({
        message: "Cannot add bus plate already exists",
      });
    }
    const buses = new Bus({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      plate: req.body.plate,
      capacity: req.body.capacity,
      route: req.body.route,
      fare: req.body.fare,
      availableSeats: req.body.availableSeats,
      stops: req.body.stops,
    });
    const result = await buses.save();
    console.log(result);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/getBusById/:id", async (req, res) => {
  try {
    const bus = await Bus.find({ _id: req.params.id });
    if (!bus) {
      return res.status(404).json({
        message: "bus not found",
      });
    }
    res.status(200).json({
      bus: bus,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllBuses",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.delete("/deleteBusById/:id", authMiddleware, async (req, res) => {
  try {
    const result = await Bus.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "bus not found",
      });
    }
    res.status(200).json({
      message: "Bus deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/getAllbuses",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
