import React from 'react';

const BusCard = ({ bus, onBookSeat }) => {
  const { bus_name, route, total_seats, current_occupancy, eta, bus_id } = bus;
  const occupancyPercentage = (current_occupancy / total_seats) * 100;

  // Set seat availability color
  let seatStatus = 'green';
  if (occupancyPercentage > 60 && occupancyPercentage < 90) {
    seatStatus = 'yellow';
  } else if (occupancyPercentage >= 90) {
    seatStatus = 'red';
  }

  return (
    <div className="bus-card">
      <h3>{bus_name}</h3>
      <p>Route: {route}</p>
      <p>ETA: {eta}</p>
      <p>Available Seats: {total_seats - current_occupancy}</p>
      <p style={{ color: seatStatus }}>
        {occupancyPercentage < 60 ? 'Seats Available' : occupancyPercentage < 90 ? 'Seats Filling' : 'Limited Availability'}
      </p>
      <button onClick={() => onBookSeat(bus_id)}>Book Seat</button>
    </div>
  );
};

export default BusCard;
