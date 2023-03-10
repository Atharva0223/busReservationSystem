const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://" +
      process.env.USER_NAME +
      ":" +
      process.env.PASSWORD +
      "@testing.zk8zmu0.mongodb.net/?retryWrites=true&w=majority"
  );
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
