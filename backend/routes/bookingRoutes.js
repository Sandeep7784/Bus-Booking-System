const express = require('express');
const { bookSeat, cancelBooking, getAllBookings, getUserBookings } = require('../controllers/bookingController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  // Import middleware
const router = express.Router();

// Book a seat on a bus (for regular users)
router.post('/book', isAuthenticated, bookSeat);

// Cancel a booking (for regular users)
router.delete('/:booking_id', isAuthenticated, cancelBooking);

// Admin-only route: Get all bookings
router.get('/', getAllBookings);

// Bookings of a user (for regular users)
router.get('/:user_id', getUserBookings);

module.exports = router;
