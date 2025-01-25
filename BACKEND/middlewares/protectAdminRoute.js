const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.js");

const protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Retrieve token from Authorization header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findOne({ adminId: decoded.adminId }).select("-adminPassword"); // Admin Authentication

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin; // Attach the authenticated admin to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Error in protectAdminRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectAdminRoute;
