const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://" +
      process.env.USER_NAME +
      ":" +
      process.env.PASSWORD +
      "@busreservationsystem.6hurjhb.mongodb.net/test"
  );
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
