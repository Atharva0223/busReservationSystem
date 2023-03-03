const supertest = require("supertest");
const mongoose = require("mongoose");
const index = require("../index");
const request = supertest(index);

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

//customerlogin
describe('customer login', () => {
  let token;

  beforeAll(async () => {
    // authenticate a user and get a token
    const res = await request
      .post('/customerLogin')
      .send({ email: 'testuser@example.com', password: 'password' });
    token = res.body.token;
  });

  it('should return a token for a valid customer login', async () => {
    const res = await request
      .post('/customerLogin')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'testuser@example.com', password: 'password' });
    expect(res.statusCode).toBe(200);
  });

  it('should return a 401 status code for an invalid customer login', async () => {
    const res = await request
      .post('/customerLogin')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'testuser@example.com', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
  });
});
