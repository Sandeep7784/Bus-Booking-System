import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../api/api';  // Correctly importing getAuthToken
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();  // Using useNavigate for programmatic navigation
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user data from the backend (use the relevant API function)
        const token = getAuthToken();  // Using getAuthToken to retrieve the token
        if (!token) {
          navigate('/login');  // Redirect to login if no token is found
        }
        // Simulating a user data fetch with a static object
        const userData = { username: 'JohnDoe', email: 'john@example.com', role: 'user' };
        setUser(userData);
      } catch (err) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handlePasswordChange = async () => {
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    try {
      // Call API to update the user's password
      // Simulate password change success
      setSuccessMessage('Password updated successfully');
      setError('');
    } catch (err) {
      setError('Error updating password');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      {user && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <p className="text-gray-600">Username: {user.username}</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>

          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-gray-600">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter new password"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
