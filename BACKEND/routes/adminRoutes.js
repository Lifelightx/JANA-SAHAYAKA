const express = require("express");
const { loginAdmin, getAllComplaints } = require("../controllers/adminController");
const protectAdminRoute = require("../middlewares/protectAdminRoute"); // Correct import
const {getTotalComplaints,getTotalResolvedComplaints,getTotalInProgressComplaints}=require("../controllers/complaintController");
const router = express.Router();

router.post("/login", loginAdmin); // Admin login route
router.get("/complaints", protectAdminRoute, getAllComplaints); // Protecting the view all complaints route with middleware
router.get("/noOfComplaints", getTotalComplaints); // Protecting the view all complaints route with middleware
router.get('/total-resolved', getTotalResolvedComplaints); // Route to get total resolved complaints
router.get('/total-in-progress', getTotalInProgressComplaints); // Route to get total in-progress complaints

module.exports = router;
