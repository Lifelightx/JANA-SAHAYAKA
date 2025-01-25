const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");

// Controller for admin login
const loginAdmin = async (req, res) => {
  try {
    const { adminId, adminPassword } = req.body;

    // Validate input
    if (!adminId || !adminPassword) {
      return res.status(400).json({ message: "Admin ID and password are required" });
    }

    // Find admin in the database
    const admin = await Admin.findOne({ adminId });
    if (!admin || admin.adminPassword !== adminPassword) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin.adminId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set token in cookie
    res.cookie("jwt", token, { httpOnly: true, secure: false }); // Secure should be true in production

    // Send success response
    res.status(200).json({ message: "Admin login successful", token: token });

  } catch (error) {
    console.error("Error in admin login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for fetching all complaints for admin
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email phoneNo");
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching all complaints:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginAdmin, getAllComplaints };
