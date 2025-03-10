const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth'); // Middleware to check if the user is an admin

const router = express.Router();

// Admin login route
router.post('/login', userController.adminLogin);

// Protected admin routes
router.get('/dashboard', auth, adminAuth, (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

module.exports = router;