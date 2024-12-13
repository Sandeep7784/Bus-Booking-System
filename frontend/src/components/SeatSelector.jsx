import React, { useState } from 'react';

const SeatSelector = ({ availableSeats, onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seat) => {
    setSelectedSeat(seat);
    onSeatSelect(seat);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Select your seat</h3>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {availableSeats.map((seat) => (
          <button
            key={seat}
            className={`w-10 h-10 rounded-lg ${selectedSeat === seat ? 'bg-blue-600' : 'bg-gray-300'} hover:bg-blue-500`}
            onClick={() => handleSelect(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
