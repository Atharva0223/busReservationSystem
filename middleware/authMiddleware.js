const jwt = require('jsonwebtoken');

require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    next(); // call the next middleware or route handler
  } catch (err) {
    console.log(err); // log the error to the console
    res.status(401).json({
      message: "Authentication failed",
      error: err // include the error in the response for debugging purposes
    });
  }
};

module.exports = authMiddleware;
