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
    const result = await Stops.find({ isDeleted: false })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({
      "All the stops are ": result,
      request: {
        method: "POST",
        url: "http://localhost:3000/getAllBuses",
      },
    });
  } catch (err) {
    console.log(err);
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
    )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ Removing: result, Operation: "Success" });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedStops", employeeMiddleware, async (req, res) => {
  try {
    const result = await Stops.find({ isDeleted: true })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    res.status(200).json({ "All the removed stops are ": result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateStop/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.params.body;
    const updates = await Stops.updateOne(
      { _id: req.params.id },
      { $set: { setter } }
    );
    res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
