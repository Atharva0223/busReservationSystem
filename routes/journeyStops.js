const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const JourneyStops = require("../models/journeyStops");

router.post("/addJourneyStops", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await JourneyStops.findOne({
      $and: [{ journey: req.body.journey, stops: req.body.stops }],
    });
    if (exists) {
      return res.status(409).json({ message: "JourneyStop already exists" });
    }
    const result = await JourneyStops.create({
      _id: mongoose.Types.ObjectId(),
      journey: req.body.journey,
      stops: req.body.stops,
      createdBy: req.body.createdBy,
    });
    res.status(200).json({
      message: "Operation successful",
      result: {
        _id: result._id,
        journey: result.journey,
        stops: result.stops,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllJourneyStops", middleware, async (req, res) => {
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
    const journeyStops = await JourneyStops.find({ isDeleted: false });
    res
      .status(200)
      .json({ message: "Operation successful", result: journeyStops });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeJourneyStopsByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await JourneyStops.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "JourneyStop not found" });
    }
    const result = await JourneyStops.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedJourneyStops", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const result = await JourneyStops.find({ isDeleted: true });
    res.status(200).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
