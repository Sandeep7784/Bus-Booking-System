import React from 'react';

const BusCard = ({ bus }) => {
  const { bus_name, total_seats, current_occupancy, schedule_time } = bus;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{bus_name}</h2>
      <p className="text-gray-600">Seats Available: {total_seats - current_occupancy}</p>
      <p className="text-gray-600">Schedule: {schedule_time}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );
};

export default BusCard;
