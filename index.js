const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set('strictQuery', false);

const Login = require('./routes/login');
const Register = require('./routes/register');
const Customer = require("./routes/customer");
const Employee = require("./routes/employee");
const Bus = require('./routes/bus');

mongoose.connect('mongodb+srv://'+ process.env.USER_NAME + ':' + process.env.PASSWORD +'@busreservationsystem.6hurjhb.mongodb.net/?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.json());

app.use(Login);
app.use(Register);
app.use(Customer);
app.use(Employee);
app.use(Bus);

module.exports = app;
