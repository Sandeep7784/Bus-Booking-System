import React from 'react';
import {bookSeat}  from '../api/api';

const BusCard = ({ bus, user }) => {
  if (!user) {
    return <div>Loading...</div>; 
  }
  const { bus_id, bus_name, total_seats, current_occupancy, route_id, days_of_operation, schedule_time } = bus;
  const { user_id, username, email } = user;

  const handleBooking = async () => {
    try {
      await bookSeat(user_id, bus_id, current_occupancy + 1, 4);
    } catch (error) {
      console.error('Error booking seat:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{bus_name}</h2>
      <p className="text-gray-600">Bus ID: {bus_id}</p>
      <p className="text-gray-600">Seats Available: {total_seats - current_occupancy}</p>
      {/* <p className="text-gray-600">Total Seats: {total_seats}</p>
      <p className="text-gray-600">Current Occupancy: {current_occupancy}</p> */}
      <p className="text-gray-600">Route ID: {route_id}</p>
      <p className="text-gray-600">Days of Operation: {days_of_operation}</p>
      <p className="text-gray-600">Schedule: {schedule_time}</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
};

export default BusCard;
