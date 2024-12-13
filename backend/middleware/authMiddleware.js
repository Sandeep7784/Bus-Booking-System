const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the user info to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.userId);
  
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }

  next();
};

module.exports = { isAuthenticated, isAdmin };

