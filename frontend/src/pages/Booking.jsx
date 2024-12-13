import React, { useState, useEffect } from 'react';
import SeatMap from '../components/SeatMap';
import { fetchSeatAvailability, bookSeat } from '../api';

const Booking = ({ busId }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const getSeatAvailability = async () => {
      const data = await fetchSeatAvailability(busId);
      setSeats(data);
    };
    getSeatAvailability();
  }, [busId]);

  const handleSeatBooking = async (seat) => {
    try {
      await bookSeat(busId, seat.seat_number);
      alert('Seat booked successfully!');
    } catch (error) {
      alert('Booking failed!');
    }
  };

  return (
    <div>
      <h1>Seat Booking</h1>
      <SeatMap seats={seats} onSeatClick={handleSeatBooking} />
    </div>
  );
};

export default Booking;
