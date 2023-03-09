const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  employeeMiddleware,
} = require("../middleware/authMiddleware");
require("dotenv").config();

const Journey = require("../models/journey");
const Bus = require("../models/bus");
const Tax = require("../models/tax");
const Coupon = require("../models/coupons");

router.post("/addJourney", employeeMiddleware, async (req, res) => {
  try {
    const bus = await Bus.findById(req.body.bus);
    const tax = await Tax.findById(req.body.tax);
    const coupon = await Coupon.findById(req.body.coupon);

    if (!bus || !tax) {
      return res.status(400).json({ error: "Bus or tax not found" });
    }

    const seatFare = bus.seats.seat_fare;
    const cgst = tax.cgst;
    const sgst = tax.sgst;
    const tolls = tax.tolls;
    const state_cross_tax = tax.state_cross_tax;

    let totalFare = seatFare * (cgst + sgst) + tolls + state_cross_tax;

    if (coupon) {
      const couponValue = coupon.value;
      totalFare -= couponValue;
    }

    const journey = await Journey.create({
      _id: mongoose.Types.ObjectId(),
      From: req.body.from,
      To: req.body.to,
      bus: req.body.bus,
      tax: req.body.tax,
      coupon: req.body.coupon,
      fare: totalFare,
      createdBy: req.body.createdBy,
    });

    res.status(201).json({
      Journey: {
        from: journey.From,
        to: journey.To,
        bus: journey.bus,
        tax: journey.tax,
        coupon: journey.coupon,
        fare: journey.fare,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllJourneys", authMiddleware, async (req, res) => {
  try {
    const journeys = await Journey.find({ isDeleted: false })
      .populate("bus")
      .populate("tax")
      .populate("coupon");

    res.status(200).json({
      result: journeys,
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeJourneyByID/:id", employeeMiddleware, async (req, res) => {
  try {
    const result = await Journey.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    )
      .populate("bus")
      .populate("tax")
      .populate("coupon");
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.get("/getAllRemovedJourney", employeeMiddleware, async (req, res) => {
  try {
    const result = await Journey.find({ isDeleted: true })
      .populate("bus")
      .populate("tax")
      .populate("coupon");
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateJourneys/:id", employeeMiddleware, async (req, res) => {
  try {
    const setter = req.body;
    const updates = await Journey.updateOne(
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
