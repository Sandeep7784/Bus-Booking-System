const express = require('express');
const { createBusDetails, getBusDetails, updateBusDetails, deleteBusDetails } = require('../controllers/busDetailsController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Create bus details (schedule, days of operation)
router.post('/create', isAuthenticated, isAdmin, createBusDetails);

// Get bus details by bus id
router.get('/:bus_id', getBusDetails);

// Admin-only route: Update bus details
router.put('/:bus_id', isAuthenticated, isAdmin, updateBusDetails);

// Admin-only route: Delete bus details
router.delete('/:bus_id', isAuthenticated, isAdmin, deleteBusDetails);

module.exports = router;
