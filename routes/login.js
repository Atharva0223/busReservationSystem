const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const middleware = require("../middleware/middleware");

const Customer = require("../models/customer");
const Employee = require("../models/employee");

router.post("/employeeLogin", middleware, async (req, res) => {
  if (req.userData.role !== "Admin" && req.userData.role !== "Employee") {
    return res.status(403).json({
      message: "Forbidden: Only employees can access this resource",
    });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const employeeExists = await Employee.findOne({ email: email });
    if (employeeExists) {
      const matchEmpPassword = await bcrypt.compare(
        password,
        employeeExists.password
      );
      if (matchEmpPassword) {
        const payload = {
          email: email,
          id: employeeExists._id,
          role: "Admin",
        };
        const options = {
          expiresIn: "24h",
        };

        const eToken = jwt.sign(payload, process.env.JWT_KEY, options);

        const decodedToken = jwt.verify(eToken, process.env.JWT_KEY);
        res.status(200).json({
          message: "Login Successful",
          Details: {
            id: employeeExists._id,
            name: employeeExists.name,
            email: employeeExists.email,
            phone: employeeExists.phone,
            role: employeeExists.role,
          },
          Token: eToken,
          Requests: {
            "Booking Requests": {
              url1: "http://localhost:3000/getAllBookings",
              url2: "http://localhost:3000/cancelBookingById/:id",
              url3: "http://localhost:3000/getAllcanceledBookings",
              url4: "http://localhost:3000/updateBooking/:id",
            },
            "Bus Requests": {
              url1: "http://localhost:3000/addBus",
              url2: "http://localhost:3000/getAllBuses",
              url3: "http://localhost:3000/getBusById/:id",
              url4: "http://localhost:3000/removeBus/:id",
              url5: "http://localhost:3000/getAllRemovedBuses",
              url6: "http://localhost:3000/updateBus/:id",
            },
            "Coupons Requests": {
              url1: "http://localhost:3000/addCoupons",
              url2: "http://localhost:3000/getAllCoupons",
              url3: "http://localhost:3000/removeCouponByID/:id",
              url4: "http://localhost:3000/getAllRemovedCoupons",
              url5: "http://localhost:3000/updateCoupons/:id",
            },
            "Customer Requests": {
              url1: "http://localhost:3000/getAllCustomers",
              url2: "http://localhost:3000/getCustomerById/:id",
              url3: "http://localhost:3000/removeCustomerById/:id",
              url4: "http://localhost:3000/getAllRemovedCustomers",
              url5: "http://localhost:3000/updateCustomer/:id",
            },
            "Employee Requests": {
              url1: "http://localhost:3000/getAllEmployees",
              url2: "http://localhost:3000/getEmployeeById/:id",
              url3: "http://localhost:3000/removeEmployeeById/:id",
              url4: "http://localhost:3000/getAllRemovedEmployees",
              url5: "http://localhost:3000/updateEmployee/:id",
            },
            "Journey Requests": {
              url1: "http://localhost:3000/addJourney",
              url2: "http://localhost:3000/getAllJourneys",
              url3: "http://localhost:3000/removeJourneyByID/:id",
              url4: "http://localhost:3000/getAllRemovedJourney",
              url5: "http://localhost:3000/updateJourneys/:id",
            },
            "JourneyStops Requests": {
              url1: "http://localhost:3000/addJourneyStops",
              url2: "http://localhost:3000/getAllJourneyStops",
              url3: "http://localhost:3000/removeJourneyStopsByID/:id",
              url4: "http://localhost:3000/getAllRemovedJourneyStops",
            },
            "Payments Requests": {
              url1: "http://localhost:3000/addPayment",
              url2: "http://localhost:3000/getAllPayments",
              url3: "http://localhost:3000/removePaymentsByID/:id",
              url4: "http://localhost:3000/getAllRemovedPayments",
              url5: "http://localhost:3000/updatePayments/:id",
            },
            "PaymentTypes Requests": {
              url1: "http://localhost:3000/addPaymentTypes",
              url2: "http://localhost:3000/getAllPaymentTypes",
              url3: "http://localhost:3000/removePaymentTypeByID/:id",
              url4: "http://localhost:3000/getAllRemovedPaymentTypes",
              url5: "http://localhost:3000/updatePaymentTypes/:id",
            },
            "Seats Requests": {
              url1: "http://localhost:3000/addSeats",
              url2: "http://localhost:3000/getAllSeats",
              url3: "http://localhost:3000/removeSeatsByID/:id",
              url4: "http://localhost:3000/getAllRemovedSeats",
              url5: "http://localhost:3000/updateSeats/:id",
            },
            "Stops Requests": {
              url1: "http://localhost:3000/addStops",
              url2: "http://localhost:3000/getAllStops",
              url3: "http://localhost:3000/removeStopByID/:id",
              url4: "http://localhost:3000/getAllRemovedStops",
              url5: "http://localhost:3000/updateStops/:id",
            },
            "Tax Requests": {
              url1: "http://localhost:3000/addTaxes",
              url2: "http://localhost:3000/getAllTaxes",
              url3: "http://localhost:3000/removeTax/:id",
              url4: "http://localhost:3000/getAllremovedTaxes",
              url5: "http://localhost:3000/updateTax/:id",
            },
          },
        });
      } else {
        res.status(401).json({
          message: "Authentication failed: Invalid email or password",
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid email or password" });
    }
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

router.post("/customerLogin", middleware, async (req, res) => {
  if (req.userData.role !== "Customer") {
    return res.status(403).json({
      message: "Forbidden: Only employees can access this resource",
    });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const customerExists = await Customer.findOne({ email: email });
    if (customerExists) {
      const matchCustPassword = await bcrypt.compare(
        password,
        customerExists.password
      );
      if (matchCustPassword) {
        const payload = {
          email: email,
          id: customerExists._id,
          role: "Customer",
        };
        const options = {
          expiresIn: "24h",
        };
        const cToken = jwt.sign(payload, process.env.JWT_KEY, options);
        const decodedToken = jwt.verify(cToken, process.env.JWT_KEY); // Verify the token
        res.status(200).json({
          message: "Login Successful",
          Details: {
            id: customerExists._id,
            name: customerExists.name,
            email: customerExists.email,
            address: customerExists.address,
            phone: customerExists.phone,
          },
          Token: cToken,
          Requests: {
            "Journeys": {
              url: "http://localhost:3000/getAllJourneys",
            },
          },
        });
      } else {
        res.status(401).json({
          message: "Authentication failed: Invalid email or password",
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid email or password" });
    }
  } catch (err) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
