const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
require("dotenv").config();

const Journey = require("../models/journey");
const Bus = require("../models/bus");
const Tax = require("../models/tax");
const Coupon = require("../models/coupons");

router.post("/addJourney", middleware, async (req, res) => {
  if (req.userData.role !== "Admin") {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to access this resource",
    });
  }
  const { from, to, bus, tax, coupons, createdBy } = req.body;
  if (!from || !to || !bus || !tax || !coupons || !createdBy) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const exists = await Journey.find({
    $and: [{ From: req.body.from, To: req.body.to, bus: req.body.bus }],
  });
  if(exists){
    return res.status(409).json({ message:"Journey already exists"});
  }
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

    res.status(200).json({
      message: "Operation successful",
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

router.get("/getAllJourneys", middleware, async (req, res) => {
  try {
    if (
      req.userData.role !== "Customer" &&
      req.userData.role !== "Employee" &&
      req.userData.role !== "Admin"
    ) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const journeys = await Journey.find({ isDeleted: false })
      .populate("bus")
      .populate("tax")
      .populate("coupon");

    res.status(200).json({
      message: "Operation successful",
      result: journeys,
    });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/removeJourneyByID/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Journey.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Journey not found" });
    }
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

router.get("/getAllRemovedJourney", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const result = await Journey.find({ isDeleted: true })
      .populate("bus")
      .populate("tax")
      .populate("coupon");
    res.status(200).json({ message: "Operation successful", result });
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.patch("/updateJourneys/:id", middleware, async (req, res) => {
  try {
    if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
    const exists = await Journey.findOne({
      $and: [{ _id: req.params.id, isDeleted: false }],
    });
    if (!exists) {
      return res.status(404).json({ message: "Journey not found" });
    }
    const setter = req.body;
    const updates = await Journey.updateOne(
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
