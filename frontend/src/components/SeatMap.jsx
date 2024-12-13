import React from 'react';

const SeatMap = ({ seats, onSeatClick }) => {
  return (
    <div className="seat-map">
      {seats.map((seat, index) => (
        <button
          key={index}
          className={`seat ${seat.status}`}
          onClick={() => onSeatClick(seat)}
        >
          {seat.number}
        </button>
      ))}
    </div>
  );
};

export default SeatMap;
