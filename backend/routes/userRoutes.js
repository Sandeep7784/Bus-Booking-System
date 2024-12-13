const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, updateUserRole, sendProfile} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');  
const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Update user role (admin can promote or demote)
router.put('/role', updateUserRole);

// Get all users (Admin only)
router.get('/get_all_users', isAuthenticated, isAdmin, getAllUsers);

// Delete a user (Admin only)
router.delete('/:user_id', isAuthenticated, isAdmin, deleteUser);

// Get user profile route - Extracts user details from JWT token in header
router.get('/profile', sendProfile);

module.exports = router;
