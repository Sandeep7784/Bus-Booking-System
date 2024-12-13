const express = require('express');
const { createStop, getStopsForRoute, updateStop, deleteStop } = require('../controllers/stopController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Create a new bus stop
router.post('/create', isAuthenticated, isAdmin, createStop);

// Get all stops for a specific route
router.get('/:route_id', getStopsForRoute);

// Admin-only route: Update stop
router.put('/:stop_id', isAuthenticated, isAdmin, updateStop);

// Admin-only route: Delete stop
router.delete('/:stop_id', isAuthenticated, isAdmin, deleteStop);

module.exports = router;
