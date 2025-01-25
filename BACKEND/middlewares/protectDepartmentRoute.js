const jwt = require("jsonwebtoken");
const Department = require("../models/Department.js");

const protectDepartmentRoute = async (req, res, next) => {
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
    
    const department = await Department.findById(decoded.departmentId).select("-departmentPassword"); // Department Authentication
    
    if (!department) {
        return res.status(404).json({ message: "Department not found" });
    }
    
    req.department = department; // Attach the authenticated department to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Error in protectDepartmentRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectDepartmentRoute;
