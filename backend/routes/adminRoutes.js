const express = require('express');
const { createAdmin } = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Admin-only route: Create new admin
router.post('/create', isAuthenticated, isAdmin, createAdmin);

module.exports = router;
