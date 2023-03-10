const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Stops = require("../models/stops");

router.post("/addStops", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Stops.findOne({
      $and: [
        { stop_name: req.body.stop_name, stop_state: req.body.stop_state },
      ],
    });
    if (exists) {
      res.status(409).json({ message: "Stop already exists" });
    }
    const result = await Stops.create({
      _id: mongoose.Types.ObjectId(),
      stop_name: req.body.stop_name,
      stop_state: req.body.stop_state,
      createdBy: req.body.createdBy,
    });
    res.status(200).json({
      message: "Operation Successful",
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

router.get("/getAllStops", middleware, async (req, res) => {
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
    const result = await Stops.find({ isDeleted: false });
    res.status(200).json({
      message: "Operation Successful",
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

router.patch("/removeStopByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Stops.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Stop not found" });
    }
    const result = await Stops.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ message: "Operation Successful", Removing: result });
  } catch (err) {
    res.status(400).json({
      message: "Bad request",
      error: err,
    });
  }
});

router.get("/getAllRemovedStops", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const result = await Stops.find({ isDeleted: true });
    res.status(200).json({
      message: "Operation Successful",
      "All the removed stops are ": result,
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateStops/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Stops.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Stop not found" });
    }
    const setter = req.body;
    const updates = await Stops.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Update Successful", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
