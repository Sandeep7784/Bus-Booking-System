const Booking = require('../models/bookingModel');
const Bus = require('../models/busModel');

// Book a seat on a bus
exports.bookSeat = async (req, res) => {
  try {
    const { user_id, bus_id, seat_number, stop_id } = req.body;

    // Check if the seat is already booked
    const existingBooking = await Booking.findOne({ where: { bus_id, seat_number, stop_id } });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

    const booking = await Booking.create({
      user_id,
      bus_id,
      seat_number,
      stop_id,
    });

    res.status(201).json({ message: 'Seat booked successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking seat' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const booking = await Booking.findByPk(booking_id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};