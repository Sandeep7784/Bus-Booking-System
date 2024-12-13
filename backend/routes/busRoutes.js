const express = require('express');
const { createBus, getAllBuses, updateBus, deleteBus } = require('../controllers/busController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Create a new bus (Admin only)
router.post('/create', isAuthenticated, isAdmin, createBus);

// Get all buses (Public route)
router.get('/', getAllBuses);

// Update bus details (Admin only)
router.put('/:bus_id', isAuthenticated, isAdmin, updateBus);

// Delete bus (Admin only)
router.delete('/:bus_id', isAuthenticated, isAdmin, deleteBus);

module.exports = router;
