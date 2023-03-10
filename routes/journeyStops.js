const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const JourneyStops = require("../models/journeyStops");

router.post("/addJourneyStops", employeeMiddleware, async (req, res) => {
  try {
    const exists = await JourneyStops.findOne({
      $and: [{ journey: req.body.journey, stops: req.body.stops }],
    });
    if(exists){
      return res.status(409).json({message: "JourneyStop already exists"});
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

router.get("/getAllJourneyStops", authMiddleware, async (req, res) => {
  try {
    const journeyStops = await JourneyStops.find({ isDeleted: false });
    res.status(200).json({ message: "Operation successful", result: journeyStops });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch(
  "/removeJourneyStopsByID/:id",
  employeeMiddleware,
  async (req, res) => {
    try {
      const exists = await JourneyStops.findOne({$and:[{_id: req.params.id,isDeleted:false}]});
      if(!exists){
        return res.status(404).json({message:"JourneyStop not found"});
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
  }
);

router.get(
  "/getAllRemovedJourneyStops",
  employeeMiddleware,
  async (req, res) => {
    try {
      const result = await JourneyStops.find({ isDeleted: true });
      res.status(200).json({ message: "Operation successful", result });
    } catch (err) {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
);

module.exports = router;
