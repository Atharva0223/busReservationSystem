const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const middleware = require("../middleware/middleware");

const Bus = require("../models/bus");
const Seats = require("../models/seats");

router.post("/addBus", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = req.body;
    if (
      !exists.name ||
      !exists.plate ||
      !exists.type_of_bus ||
      !exists.capacity ||
      !exists.available_seats ||
      !exists.seats ||
      !exists.working_days ||
      !exists.createdBy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const buses = await Bus.findOne({ plate: req.body.plate });
    if (buses) {
      return res.status(409).json({
        message: "Bus already exists",
      });
    }

    const bus = new Bus({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      plate: req.body.plate,
      type_of_bus: req.body.type_of_bus,
      capacity: req.body.capacity,
      available_seats: req.body.available_seats,
      seats: req.body.seats,
      working_days: req.body.working_days,
      createdBy: req.body.createdBy,
    });

    const result = await bus.save();
    res.status(201).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBuses",middleware, async (req, res) => {
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
    const buses = await Bus.find({ isDeleted: false }).populate("seats");

    res.status(200).json({ message: "Operation successful", buses });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getBusById/:id", middleware, async (req, res) => {
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
    const buses = await Bus.find({ _id: req.params.id }).populate(
      "journey",
      "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted"
    );

    const busesWithSeats = await Promise.all(
      buses.map(async (bus) => {
        const seats = await Seats.find({ seat_type: bus.type_of_bus }).lean();
        return {
          ...bus,
          seats,
          availableSeats: bus.available_seats,
        };
      })
    );

    res.status(200).json({
      buses: busesWithSeats,
      Request: {
        method: "GET",
        url: "http://localhost:3000/booking",
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeBus/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Bus.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }
    const result = await Bus.findByIdAndUpdate(req.params.id, {
      $set: { isDeleted: true },
    });
    res.status(200).json({
      message: "Operation sucessful",
      "Removing this Bus from collection": result,
    });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedBuses", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const docs = await Bus.find({ isDeleted: true });
    res.status(200).json({ message: "Operation successful", docs });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateBus/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Only employees can access this resource",
      });
    }
    const exists = await Bus.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({
        message: "Bus not found",
      });
    }
    const setter = req.body;
    const updates = await Bus.updateOne(
      { _id: req.params.id },
      { $set: setter }
    );
    res.status(200).json({ message: "Operation successful", Updated: setter });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
