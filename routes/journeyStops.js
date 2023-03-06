const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const JourneyStops = require("../models/journeyStops");

router.post("/addJourneyStops",employeeMiddleware, async (req, res) => {
  try {
    const result = await JourneyStops.create({
      _id: mongoose.Types.ObjectId(),
      journey: req.body.journey,
      stops: req.body.stops,
      createdBy: req.body.createdBy
    })
    res.status(201).json({ result :
    {
      _id: result._id,
      journey: result.journey,
      stops: result.stops
    }});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllJourneyStops",authMiddleware, async (req, res) => {
  try {
    const journeyStops = await JourneyStops.find({isDeleted: false})
    res.status(200).json({ result: journeyStops });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeJourneyStopsByID/:id",employeeMiddleware, async (req, res) => {
  try {
    const result = await JourneyStops.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    )
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedJourneyStops",employeeMiddleware, async (req, res) => {
  try {
    const result = await JourneyStops.find({ isDeleted: true })
    res.status(200).json({ result });
  }catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updatejourneyStops/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
      const updates = await JourneyStops.updateOne(
        { _id: req.params.id },
        { $set:  setter  }
      );
      res.status(200).json({ Updated: updates });
  } catch {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
