import React from 'react';

const BookingStatus = ({ status, message }) => {
  return (
    <div className={`p-4 mt-4 rounded-md ${status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
      <p>{message}</p>
    </div>
  );
};

export default BookingStatus;
