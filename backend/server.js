const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Load environment variables
dotenv.config();


const User = require('./models/userModel');
const Bus = require('./models/busModel');
const Trip = require('./models/tripModel');
const Stop = require('./models/stopModel');
const Booking = require('./models/bookingModel');
const BusDetails = require('./models/busDetailsModel');


// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const tripRoutes = require('./routes/tripRoutes');
const stopRoutes = require('./routes/stopRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const busDetailsRoutes = require('./routes/busDetailsRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/bus-details', busDetailsRoutes);
app.use('/api/admins', adminRoutes);

// Database connection setup
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,  // Disable logging for cleaner console output
});

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced successfully!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
