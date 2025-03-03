const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        console.log("User not found in database");
        return res.status(401).json({ message: "User not found, authorization denied" });
      }

      console.log("Authenticated User:", req.user);
      next(); // ✅ Proceed to next middleware

    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
  } else {
    console.log("No token provided in request headers");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };


