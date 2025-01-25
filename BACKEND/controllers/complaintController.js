const Complaint = require('../models/Complaint');
const User = require('../models/User');
const Department = require('../models/Department');

// Create a new complaint
exports.createComplaint = async (req, res) => {
  const { title, category, description, image, departmentId } = req.body;
  const userId = req.user._id; // Use user ID from authenticated user

  try {
    // Find user to get location details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the departmentId exists
    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const location = `${user.village}, ${user.tahsil}, ${user.district}`;

    const newComplaint = new Complaint({
      title,
      category,
      description,
      image,
      location,
      user: userId,
      assignedDepartment: departmentId, // Use departmentId field
      status: 'Pending'
    });

    const savedComplaint = await newComplaint.save();

    // Add complaint to user's complaints
    await User.findByIdAndUpdate(userId, {
      $push: { complaints: savedComplaint._id }
    });

    res.status(201).json({ 
      message: 'Complaint created successfully', 
      complaint: savedComplaint 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all complaints of the authenticated user
exports.viewAllComplaints = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated user
    const user = await User.findById(userId).populate('complaints');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View a specific complaint by ID including its status
exports.viewComplaint = async (req, res) => {
  const { id } = req.body;

  try {
    const complaint = await Complaint.findById(id).populate('user', 'name email phoneNo');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    // Check if the requesting user is the owner of the complaint
    if (complaint.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a complaint (only for Pending status)
exports.updateComplaint = async (req, res) => {
  const { title, category, description, id } = req.body;

  try {
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if the requesting user is the owner of the complaint
    if (complaint.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (complaint.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending complaints can be edited' });
    }

    complaint.title = title;
    complaint.category = category;
    complaint.description = description;

    const updatedComplaint = await complaint.save();

    res.status(200).json({ 
      message: 'Complaint updated successfully', 
      complaint: updatedComplaint 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a complaint (only for Pending status)
exports.deleteComplaint = async (req, res) => {
  const { id } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if the requesting user is the owner of the complaint
    if (complaint.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (complaint.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending complaints can be deleted' });
    }

    await Complaint.findByIdAndDelete(id);

    // Remove complaint reference from user
    await User.findByIdAndUpdate(complaint.user, {
      $pull: { complaints: id }
    });

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get total number of complaints
exports.getTotalComplaints = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    res.status(200).json({ totalComplaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTotalResolvedComplaints = async (req, res) => {
  try {
    const totalResolved = await Complaint.countDocuments({ status: 'Resolved' });
    res.status(200).json({ totalResolved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total number of in-progress complaints
exports.getTotalInProgressComplaints = async (req, res) => {
  try {
    const totalInProgress = await Complaint.countDocuments({ status: 'In Progress' });
    res.status(200).json({ totalInProgress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;
