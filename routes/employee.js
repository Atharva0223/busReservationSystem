const express = require("express");
const router = express.Router();

require("dotenv").config();

const Employee = require("../models/employee");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllEmployees", authMiddleware, async (req, res) => {
  try {
    const docs = await Employee.find();
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

router.delete("/deleteEmployeeById/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedEmployee = await Employee.deleteOne({ _id: id });

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    res.set("authorization", "");
    res.status(200).json({
      message: "Employee deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
