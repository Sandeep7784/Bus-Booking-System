const express = require('express');
const { createBus, getAllBuses, updateBus, deleteBus, getBusById, updateBusPartially } = require('../controllers/busController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Create a new bus (Admin only)
router.post('/create', isAuthenticated, isAdmin, createBus);

// Get all buses (Public route)
router.get('/', getAllBuses);

// Get details of a specific bus (Public route)
router.get('/:bus_id', getBusById);

// updating the seat's
router.patch('/:bus_id', updateBusPartially);

// Update bus details (Admin only)
router.put('/:bus_id', isAuthenticated, isAdmin, updateBus);

// Delete bus (Admin only)
router.delete('/:bus_id', isAuthenticated, isAdmin, deleteBus);

module.exports = router;
