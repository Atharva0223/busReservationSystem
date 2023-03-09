const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  employeeMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const Stops = require("../models/stops");

router.post("/addStops", employeeMiddleware, async (req, res) => {
  try {
    const result = await Stops.create({
      _id: mongoose.Types.ObjectId(),
      stop_name: req.body.stop_name,
      stop_state: req.body.stop_state,
      createdBy: req.body.createdBy,
    });
    res.status(201).json({
      "Adding stop": {
        stop_name: req.body.stop_name,
        stop_state: req.body.stop_state,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllStops", authMiddleware, async (req, res) => {
  try {
    const result = await Stops.find({ isDeleted: false });
    res.status(200).json({
      "All the stops are ": result,
      request: {
        method: "POST",
        url: "http://localhost:3000/getAllBuses",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeStopByID/:id", employeeMiddleware, async (req, res) => {
  try {
    const result = await Stops.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ Removing: result, Operation: "Success" });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedStops", employeeMiddleware, async (req, res) => {
  try {
    const result = await Stops.find({ isDeleted: true });
    res.status(200).json({ "All the removed stops are ": result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateStops/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    const updates = await Stops.updateOne(
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
