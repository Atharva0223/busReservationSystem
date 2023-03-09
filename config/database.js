const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://" +
    process.env.USER_NAME +
    ":" +
    process.env.PASSWORD +
    "@busreservationsystem.6hurjhb.mongodb.net/?retryWrites=true&w=majority"
);
