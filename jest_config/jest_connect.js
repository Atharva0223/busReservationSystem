const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://test:test@testing.zk8zmu0.mongodb.net/test"
  );
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
