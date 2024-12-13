import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold">{user.username}</h2>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Role: {user.role}</p>
    </div>
  );
};

export default UserProfile;
