import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ role }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bus Booking System</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            {role === 'admin' ? (
              <>
                <li><Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link></li>
                <li><Link to="/admins/create" className="hover:text-gray-300">Create Admin</Link></li>
              </>
            ) : role === 'user' ? (
              <>
                <li><Link to="/bookings" className="hover:text-gray-300">My Bookings</Link></li>
                <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
              </>
            ) : null}
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            {role && (
              <li>
                <button 
                  className="hover:text-gray-300"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login'; // Navigate to login page
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
