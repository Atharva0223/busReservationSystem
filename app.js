require("dotenv").config();

require("./config/database");
// require("./jest_config/jest_connect");

const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());

const Login = require("./routes/login");
const Customer = require("./routes/customer");
const Employee = require("./routes/employee");
const Journey = require("./routes/journey");
const Stops = require("./routes/stops");
const Bus = require("./routes/bus");
const Seats = require("./routes/seats");
const Booking = require("./routes/booking");
const PaymentTypes = require("./routes/paymentTypes");
const Tax = require("./routes/tax");
const Coupons = require("./routes/coupons");
const JourneyStops = require("./routes/journeyStops");
const Payments = require("./routes/payments");

app.use(morgan("dev"));

app.use(Login);
app.use(Customer);
app.use(Employee);
app.use(Journey);
app.use(Stops);
app.use(Bus);
app.use(Seats);
app.use(Booking);
app.use(PaymentTypes);
app.use(Tax);
app.use(Coupons);
app.use(JourneyStops);
app.use(Payments);

app.get("/", (req, res) => {
  res.status(200).send({
    Hello: "Welcome to Bus Reservation System",
    LoginRequests: {
      "Employee Login": "Employee Login",
      "Send method": "POST",
      url1: "http://localhost:3000/employeeLogin",
      "Customer Login": "Customer Login",
      "Send Method": "POST",
      url2: "http://localhost:3000/customerLogin",
    },
    RegisterRequests: {
      "Employee Register": "Employee Register",
      "Send method": "POST",
      url1: "http://localhost:3000/registerEmployee",
      "Customer Register": "Customer Register",
      "Send Method": "POST",
      url2: "http://localhost:3000/registerCustomer",
    },
  });
});

module.exports = app;
