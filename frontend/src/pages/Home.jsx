import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BusCard from '../components/BusCard';
import { fetchBuses } from '../api';

const Home = () => {
  const [buses, setBuses] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const getBuses = async () => {
      const data = await fetchBuses(source, destination);
      setBuses(data);
    };
    getBuses();
  }, [source, destination]);

  return (
    <div>
      <h1>Browse Buses</h1>
      <div>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>
      </div>
      <div className="bus-list">
        {buses.map((bus) => (
          <BusCard key={bus.bus_id} bus={bus} onBookSeat={(busId) => alert(`Book seat on bus ${busId}`)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
