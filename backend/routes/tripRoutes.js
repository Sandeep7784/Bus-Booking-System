const express = require('express');
const { createTrip, getUserTrips, getAllTrips } = require('../controllers/tripController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Create a new trip (booking)
router.post('/create', isAuthenticated, createTrip);

// Get trips for a specific user
router.get('/:user_id', isAuthenticated, getUserTrips);

// Admin-only route: Get all trips
router.get('/', isAuthenticated, isAdmin, getAllTrips);

module.exports = router;
