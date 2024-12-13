import React, { useState, useEffect } from 'react';
import { fetchBuses, createBus, updateBus, deleteBus } from '../api/api';

const BusManagementPage = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');
  const [newBus, setNewBus] = useState({
    bus_name: '',
    total_seats: '',
    route_id: '',
    days_of_operation: 'Monday, Saturday, Thursday', // Default days of operation
    schedule_time: '09:00:00', // Default schedule time
  });
  const [editingBus, setEditingBus] = useState(null); // State to track the bus being edited

  useEffect(() => {
    const loadBuses = async () => {
      try {
        const busesData = await fetchBuses();
        setBuses(busesData);
      } catch (err) {
        setError('Error fetching bus data');
      }
    };
    loadBuses();
  }, []);

  const handleAddBus = async () => {
    try {
      await createBus(
        newBus.bus_name,
        newBus.total_seats,
        newBus.route_id,
        newBus.days_of_operation,
        newBus.schedule_time
      );
      setNewBus({ bus_name: '', total_seats: '', route_id: '', days_of_operation: 'Monday, Saturday, Thursday', schedule_time: '09:00:00' });
      // Refresh bus list
      const busesData = await fetchBuses();
      setBuses(busesData);
    } catch (err) {
      setError('Error adding bus');
    }
  };

  const handleUpdateBus = async () => {
    try {
      if (editingBus) {
        await updateBus(
          editingBus.bus_id,
          editingBus.bus_name,
          editingBus.total_seats,
          editingBus.route_id,
          editingBus.days_of_operation,
          editingBus.schedule_time
        );
        setEditingBus(null); // Exit editing mode
        const busesData = await fetchBuses(); // Refresh bus list
        setBuses(busesData);
      }
    } catch (err) {
      setError('Error updating bus');
    }
  };

  const handleDeleteBus = async (bus_id) => {
    try {
      await deleteBus(bus_id);
      const busesData = await fetchBuses(); // Refresh bus list
      setBuses(busesData);
    } catch (err) {
      // setError('Error deleting bus');
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Manage Buses</h1>
      {error && <p className="text-red-600">{error}</p>}

      {/* Add Bus Form */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Add New Bus</h2>
        <input
          type="text"
          placeholder="Bus Name"
          value={newBus.bus_name}
          onChange={(e) => setNewBus({ ...newBus, bus_name: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={newBus.total_seats}
          onChange={(e) => setNewBus({ ...newBus, total_seats: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Route ID"
          value={newBus.route_id}
          onChange={(e) => setNewBus({ ...newBus, route_id: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Days of Operation"
          value={newBus.days_of_operation}
          onChange={(e) => setNewBus({ ...newBus, days_of_operation: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="time"
          placeholder="Schedule Time"
          value={newBus.schedule_time}
          onChange={(e) => setNewBus({ ...newBus, schedule_time: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        />
        <button
          onClick={handleAddBus}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Add Bus
        </button>
      </div>

      {/* Display Buses */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Existing Buses</h2>
        <ul className="space-y-4">
          {buses.map((bus) => (
            <li key={bus.bus_id} className="bg-white p-4 shadow-md rounded-lg">
              {editingBus && editingBus.bus_id === bus.bus_id ? (
                <div>
                  <input
                    type="text"
                    value={editingBus.bus_name}
                    onChange={(e) =>
                      setEditingBus({ ...editingBus, bus_name: e.target.value })
                    }
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="number"
                    value={editingBus.total_seats}
                    onChange={(e) =>
                      setEditingBus({
                        ...editingBus,
                        total_seats: e.target.value,
                      })
                    }
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="number"
                    value={editingBus.route_id}
                    onChange={(e) =>
                      setEditingBus({ ...editingBus, route_id: e.target.value })
                    }
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    value={editingBus.days_of_operation}
                    onChange={(e) =>
                      setEditingBus({
                        ...editingBus,
                        days_of_operation: e.target.value,
                      })
                    }
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="time"
                    value={editingBus.schedule_time}
                    onChange={(e) =>
                      setEditingBus({
                        ...editingBus,
                        schedule_time: e.target.value,
                      })
                    }
                    className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  <button
                    onClick={handleUpdateBus}
                    style={{
                      backgroundColor: '#16a34a',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      marginRight: '0.5rem',
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBus(null)}
                    style={{
                      backgroundColor: '#4b5563',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">{bus.bus_name}</h3>
                  <p>Seats: {bus.total_seats}</p>
                  <p>Days of Operation: {bus.days_of_operation}</p>
                  <p>Schedule Time: {bus.schedule_time}</p>
                  <button
                    onClick={() => setEditingBus(bus)}
                    style={{
                      backgroundColor: '#eab308',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      marginRight: '0.5rem',
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBus(bus.bus_id)}
                    style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusManagementPage;
