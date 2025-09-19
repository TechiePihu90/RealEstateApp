const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
   
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ message: "Internal Server Error" });
  }

  //checks if the user has authorization header like Authorization: Bearer <token> if yes extract token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);

      //verify token using jwt.verify if token is valid you will get payload user_id 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      //Use the userId from token to find the actual user in the database.
//Attach that user object to req.user so other routes can access it .select("-password") → don’t include the password field
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        console.log("User not found in database");
        return res.status(401).json({ message: "User not found, authorization denied" });
      }

      console.log("Authenticated User:", req.user);
      next(); 

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


