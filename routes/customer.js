const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllCustomers", authMiddleware, async (req, res) => {
  try {
    const docs = await Customer.find({isDeleted: false});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/getAllDeletedCustomers", authMiddleware, async (req, res) => {
  try {
    const docs = await Customer.find({isDeleted: true});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});


router.get("/getCustomerById/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.find({ _id: req.params.id });
    if (!customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    res.status(200).json({
      customer: customer,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllCustomers",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.patch("/deleteCustomerById/:id", authMiddleware, async (req, res) => {
  try {
    const result = await Customer.updateOne(
      { _id: req.params.id },
      {$set: {isDeleted: true}});
    if (!result) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    res.set("authorization", "");
    res.status(200).json({
      message: "customer deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/getAllCustomer",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
