const jwt = require("jsonwebtoken");
const Department = require("../models/Department");
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// Controller for logging in a department
const loginDepartment = async (req, res) => {
  try {
    const { departmentId, departmentPassword } = req.body;

    // Validate input
    if (!departmentId || !departmentPassword) {
      return res
        .status(400)
        .json({ message: "Department ID and password are required" });
    }

    // Find department in the database
    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Validate password
    if (department.departmentPassword !== departmentPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { departmentId: department._id }, // Use ObjectId for the token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in the cookie
    res.cookie("jwt", token, { httpOnly: true, secure: false }); // Set `secure: true` in production

    // Send success response
    res.status(200).json({
      message: "Login successful",
      token: token,
      departmentId: department.departmentId,
    });
  } catch (error) {
    console.error("Error logging in department:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for managing complaints assigned to a specific department
const getComplaints = async (req, res) => {
  try {
    //const departmentIdFromToken = req.department._id; // Get department ID from authenticated department
    const { departmentId } = req.body; // Get departmentId from body
    
    // Check if the departmentId from body matches the authenticated department
    if (departmentId !== req.department.departmentId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    let complaints;
    
    if (req.body.id) {
      const complaint = await Complaint.findOne({ _id: req.body.id, assignedDepartment: departmentId });
      // console.log(complaint);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
      complaints = [complaint];
    } else {
      complaints = await Complaint.find({ assignedDepartment: departmentId });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Allow status changes based on current status
    const validStatusChanges = {
      "Pending": ["In Progress"],
      "In Progress": ["Resolved"],
      "Resolved": ["Closed"]
    };

    if (validStatusChanges[complaint.status].includes(status)) {
      complaint.status = status;
      const updatedComplaint = await complaint.save();
      res.status(200).json({
        message: "Complaint status updated successfully",
        complaint: updatedComplaint
      });
    } else {
      res.status(400).json({ message: "Invalid status change" });
    }
  } catch (error) {
    console.error("Error updating complaint status:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginDepartment, getComplaints, updateComplaintStatus };
