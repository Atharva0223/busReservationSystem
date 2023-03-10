require("dotenv").config();
const jwt = require("jsonwebtoken");

JWT_KEY = "SECRET";

const Middleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    const role = decodedToken.role;

    if (role === "Admin" || role === "Employee" || role === "Customer") {
      req.userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      next();
    }
  } catch (err) {
    res.status(403).json({
      message: "Authentication failed",
      error: err,
    });
  }
};

module.exports = Middleware;
