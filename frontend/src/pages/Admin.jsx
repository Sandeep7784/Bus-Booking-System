import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBuses, addBus, updateBus, deleteBus } from '../api';

const Admin = () => {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    bus_name: '',
    total_seats: '',
    route_id: '',
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const navigate = useNavigate();

  // Fetch all buses when the component is mounted
  useEffect(() => {
    const loadBuses = async () => {
      const data = await fetchBuses();
      setBuses(data);
    };
    loadBuses();
  }, []);

  const handleAddBus = async () => {
    const { bus_name, total_seats, route_id } = newBus;
    if (!bus_name || !total_seats || !route_id) {
      alert('Please fill in all fields');
      return;
    }
    await addBus(newBus);
    setNewBus({ bus_name: '', total_seats: '', route_id: '' });
    alert('Bus added successfully');
  };

  const handleUpdateBus = async () => {
    const { bus_name, total_seats, route_id } = selectedBus;
    if (!bus_name || !total_seats || !route_id) {
      alert('Please fill in all fields');
      return;
    }
    await updateBus(selectedBus);
    alert('Bus updated successfully');
  };

  const handleDeleteBus = async (busId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bus?');
    if (confirmDelete) {
      await deleteBus(busId);
      setBuses(buses.filter((bus) => bus.bus_id !== busId));
      alert('Bus deleted successfully');
    }
  };

  const handleInputChange = (e, field) => {
    setNewBus({ ...newBus, [field]: e.target.value });
  };

  const handleSelectBus = (busId) => {
    const bus = buses.find((bus) => bus.bus_id === busId);
    setSelectedBus(bus);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add New Bus Section */}
      <div className="add-bus">
        <h2>Add New Bus</h2>
        <input
          type="text"
          placeholder="Bus Name"
          value={newBus.bus_name}
          onChange={(e) => handleInputChange(e, 'bus_name')}
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={newBus.total_seats}
          onChange={(e) => handleInputChange(e, 'total_seats')}
        />
        <input
          type="number"
          placeholder="Route ID"
          value={newBus.route_id}
          onChange={(e) => handleInputChange(e, 'route_id')}
        />
        <button onClick={handleAddBus}>Add Bus</button>
      </div>

      {/* Update Bus Section */}
      {selectedBus && (
        <div className="update-bus">
          <h2>Update Bus</h2>
          <input
            type="text"
            placeholder="Bus Name"
            value={selectedBus.bus_name}
            onChange={(e) => setSelectedBus({ ...selectedBus, bus_name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Seats"
            value={selectedBus.total_seats}
            onChange={(e) => setSelectedBus({ ...selectedBus, total_seats: e.target.value })}
          />
          <input
            type="number"
            placeholder="Route ID"
            value={selectedBus.route_id}
            onChange={(e) => setSelectedBus({ ...selectedBus, route_id: e.target.value })}
          />
          <button onClick={handleUpdateBus}>Update Bus</button>
        </div>
      )}

      {/* Display List of Buses */}
      <h2>Manage Buses</h2>
      <div className="bus-list">
        {buses.map((bus) => (
          <div key={bus.bus_id} className="bus-item">
            <h3>{bus.bus_name}</h3>
            <p>Route ID: {bus.route_id}</p>
            <p>Total Seats: {bus.total_seats}</p>
            <button onClick={() => handleSelectBus(bus.bus_id)}>Edit</button>
            <button onClick={() => handleDeleteBus(bus.bus_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
