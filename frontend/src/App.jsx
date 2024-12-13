import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import './styles.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <Routes>
            {/* Define Routes for different pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking/:busId" element={<Booking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
