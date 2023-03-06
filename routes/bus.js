const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");

const Bus = require("../models/bus");
const Seats = require("../models/seats");

router.post("/addBus", employeeMiddleware, async (req, res) => {
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
      createdBy: req.body.createdBy
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

router.get("/getAllBuses", async (req, res) => {
  try {
    const buses = await Bus.find({ isDeleted: false }).populate("seats");

    console.log(buses);


    res.status(200).json({ buses });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getBusById/:id", employeeMiddleware, async (req, res) => {
  try {
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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllBus/:weekday", authMiddleware, async (req, res) => {
  try {
    const buses = await Bus.find({ weekday: req.params.weekday }).populate(
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
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});


//bus not deleting
router.patch("/removeBus/:id", employeeMiddleware, async (req, res) => {
  try {
    const result = await Bus.findByIdAndUpdate(req.params.id, {
      $set: { isDeleted: true },
    })
    res.status(200).json({
      "Removing this Bus from collection": result,
      Operation: "Sucess",
    });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedBuses", employeeMiddleware, async (req, res) => {
  try {
    const docs = await Bus.find({ isDeleted: true });
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
    const updates = await Bus.updateOne(
      { _id: req.params.id },
      { $set:  setter }
    );
    res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
