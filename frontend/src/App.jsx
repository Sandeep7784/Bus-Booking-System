import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import BusManagementPage from './pages/BusManagementPage';
import CreateAdminPage from './pages/CreateAdminPage'; // For admin to create new admins
import UserTrips from './pages/UserTrips';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {
  const [role, setRole] = useState(null);

  // Move role check into useEffect to avoid direct state updates
  useEffect(() => {
    const getRoleFromLocalStorage = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return decodedToken.role;  // Assuming role is embedded in the JWT payload
      }
      return null;
    };

    const role = getRoleFromLocalStorage();
    if (role) {
      setRole(role);
    }
  }, []);

  const renderHomePage = () => {
    if (role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (role === null) {
      return <Navigate to="/register" />;
    } else {
      return <HomePage />;
    }
  };

  // Updated to use element prop instead of render/component
  return (
    <Router>
      <Header role={role} />
      <main className="py-8">
        <Routes>
          <Route path="/" element={renderHomePage()} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={
            role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
          } />
          <Route path="/admin/buses" element={
            role === 'admin' ? <BusManagementPage /> : <Navigate to="/login" />
          } />
          <Route path="/admins/create" element={
            role === 'admin' ? <CreateAdminPage /> : <Navigate to="/login" />
          } />
          <Route path="/bookings" element={<UserTrips />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
