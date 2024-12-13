import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold">Manage Buses</h2>
        <Link to="/admin/buses" className="text-blue-600 hover:text-blue-800">View and Manage Buses</Link>
      </div>
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold">Create Admin</h2>
        <Link to="/admins/create" className="text-blue-600 hover:text-blue-800">Add New Admin</Link>
      </div>
      {/* Add more options for admin here */}
    </div>
  );
};

export default AdminDashboard;
