const express = require("express");
const { loginDepartment, getComplaints, updateComplaintStatus } = require("../controllers/departmentController");
const protectDepartmentRoute = require("../middlewares/protectDepartmentRoute"); // Correct import

const router = express.Router();

router.post("/login", loginDepartment); // Department login route
router.post("/complaint", protectDepartmentRoute, getComplaints); // Protecting the complaint route with middleware
router.post("/complaint/update", protectDepartmentRoute, updateComplaintStatus); // Protecting the update complaint route with middleware

module.exports = router;
