const express = require("express");
const router = express.Router();

require("dotenv").config();

const Employee = require("../models/employee");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllEmployees", authMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({isDeleted: false});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/getAllDeletedEmployees", authMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find({isDeleted: true});
    res.status(200).json({ docs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/getEmployeeById/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.find({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({
        message: "employee not found",
      });
    }
    res.status(200).json({
      employee: employee,
      request: {
        type: "GET",
        url: "http://localhost:3000/getAllEmployees",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.patch("/deleteEmployeeById/:id", authMiddleware, async (req, res) => {
  try {
    const deletedEmployee = await Employee.updateOne(
      {_id: req.params.id},
    {$set:{isDeleted: true }}
    )
    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    res.set("authorization", "");
    res.status(200).json({
      message: "Employee deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/getAllEmployees",
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
