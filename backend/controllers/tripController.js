const Trip = require('../models/tripModel');
const Booking = require('../models/bookingModel');

// Create a new trip (for booking)
exports.createTrip = async (req, res) => {
  try {
    const { user_id, bus_id, stop_id } = req.body;

    const trip = await Trip.create({
      user_id,
      bus_id,
      stop_id,
    });

    res.status(201).json({ message: 'Trip booked successfully', trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking trip' });
  }
};

// Get trips for a user
exports.getUserTrips = async (req, res) => {
  try {
    const { user_id } = req.params;
    const trips = await Trip.findAll({ where: { user_id } });
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};
