const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require('../controllers/userControllers');
const { createComplaint, updateComplaint, deleteComplaint, viewAllComplaints, viewComplaint } = require('../controllers/complaintController');
const protectRoute = require('../middlewares/protectUserRoute'); // Correct import

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/complaint', protectRoute, createComplaint); // Applying protectRoute middleware
router.post('/complaint/update', protectRoute, updateComplaint); // Applying protectRoute middleware
router.post('/complaint/delete', protectRoute, deleteComplaint); // Applying protectRoute middleware
router.get('/complaints', protectRoute, viewAllComplaints); // Route to view all complaints of the user
router.post('/complaint/view', protectRoute, viewComplaint); // Route to view a specific complaint by ID
router.get('/user_info', protectRoute, getUserInfo);

module.exports = router;
