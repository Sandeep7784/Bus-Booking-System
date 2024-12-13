const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

// Middleware to check if the user is an authenticated admin
const isAdmin = async (req, res, next) => {
  try {
    // Get token from request headers (Authorization: Bearer <token>)
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the admin user based on the decoded token's user_id
    const admin = await Admin.findByPk(decoded.admin_id);
    if (!admin || !admin.is_admin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    
    // Attach admin to the request object
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Controller to create a new admin (only accessible by an existing admin)
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the new admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create a new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password,  // Password will be hashed automatically using the model's hook
    });

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating admin' });
  }
};
