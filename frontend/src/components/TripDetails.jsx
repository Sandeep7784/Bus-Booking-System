import React from 'react';

const TripDetails = ({ trip }) => {
  const { bus_name, seats_available, trip_date, start_time, end_time } = trip;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold">{bus_name}</h2>
      <p className="text-gray-600">Available Seats: {seats_available}</p>
      <p className="text-gray-600">Trip Date: {trip_date}</p>
      <p className="text-gray-600">Time: {start_time} - {end_time}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );
};

export default TripDetails;
