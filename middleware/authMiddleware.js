require("dotenv").config();
const jwt = require("jsonwebtoken");

JWT_KEY = "SECRET";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    const role = decodedToken.role;

    if (role === "customer" || role === "Admin") {
      req.userData = {
        email: decodedToken.email,
        userId: decodedToken.userId,
        role: decodedToken.role,
      };
      next();
    } else {
      res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
      error: err,
    });
  }
};

const customerMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    const role = decodedToken.role;
    console.log("Role: " + role);
    if (role === "customer" || role === "Customer") {
      req.userData = {
        email: decodedToken.email,
        userId: decodedToken.userId,
        role: decodedToken.role,
      };
      next();
    } else {
      res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
      error: err,
    });
  }
};

const employeeMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    const role = decodedToken.role;

    if (role === "Admin" || role === "Employee"|| role === "employee") {
      req.userData = {
        email: decodedToken.email,
        userId: decodedToken.userId,
        role: decodedToken.role,
      };
      next();
    } else {
      res.status(403).json({
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
      error: err,
    });
  }
};

module.exports = {
  authMiddleware,
  customerMiddleware,
  employeeMiddleware,
};
