import React, { useState, useEffect } from 'react';
import BusCard from '../components/BusCard';
import { fetchBuses } from '../api/api';
import { getUserProfile } from "../api/api";

const HomePage = () => {
  const [buses, setBuses] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBuses = async () => {
      try {
        const data = await fetchBuses();
        setBuses(data);
        const data2 = await getUserProfile();
        setUser(data2);
      } catch (err) {
        setError('Error fetching bus data');
      }
    };
    getBuses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Available Buses</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map(bus => (
          <BusCard key={bus.bus_id} bus={bus} user={user} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
