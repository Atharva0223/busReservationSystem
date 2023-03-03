const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");

const Bus = require("../models/bus");
const Seats = require("../models/seats");

//Adding a Bus
router.post("/addBus",employeeMiddleware, async (req, res) => {
  try {
    const buses = await Bus.findOne({ plate: req.body.plate });
    if (buses) {
      return res.status(404).json({
        message: "Cannot add bus plate already exists",
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
    });

    const result = await bus.save();
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBuses", authMiddleware, async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate(
        "seats",
        "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted"
      )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();

    const busesWithSeats = await Promise.all(
      buses.map(async (bus) => {
        const seats = await Seats.find({ seat_type: bus.type_of_bus }).lean();
        return {
          ...bus,
          seats
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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});


router.get("/getBusById/:id", employeeMiddleware, async (req, res) => {
  try {
    const buses = await Bus.find({ _id: req.params.id})
      .populate(
        "journey",
        "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted"
      )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();

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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});


router.get("/getAllBus/:weekday",authMiddleware, async (req, res) => {
  try {
    const buses = await Bus.find({ weekday: req.params.weekday})
      .populate(
        "journey",
        "-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted"
      )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();

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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});


router.patch("/deleteBusById/:id", employeeMiddleware, async (req, res) => {
  try {
    const result = await Bus.updateOne(
      { _id: req.params.id },
      { $set: { isDelete: true } }
    )
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy -isDeleted")
      .lean();
    if (!result) {
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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllDeletedBuses", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Bus.find({ isDeleted: true })
      .select("-createdAt -updatedAt -__v -createdBy -updatedBy")
      .lean();
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateBus/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const updates = await Bus.updateOne(
        { _id: req.params.id },
        { $set: { setter } }
      );
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
