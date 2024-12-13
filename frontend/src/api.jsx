const API_URL = "http://localhost:5000/api";

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("token found", token);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch buses based on source and destination
export const fetchBuses = async (source, destination) => {
  const response = await fetch(
    `${API_URL}/buses?source=${source}&destination=${destination}`,
    {
      headers: getAuthHeader(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch buses");
  }
  const data = await response.json();
  return data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

// Register new user
export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

// Fetch seat availability for a specific bus
export const fetchSeatAvailability = async (busId) => {
  const response = await fetch(`${API_URL}/buses/${busId}/seats`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch seat availability");
  }
  const data = await response.json();
  return data;
};

// Book a seat on a specific bus
export const bookSeat = async (busId, seatNumber) => {
  const response = await fetch(`${API_URL}/bookings/book`, {
    method: "POST",
    body: JSON.stringify({ bus_id: busId, seat_number: seatNumber }),
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Booking failed");
  }

  return response.json();
};

// Add a new bus (admin functionality)
export const addBus = async (busData) => {
  const response = await fetch(`${API_URL}/buses/create`, {
    method: "POST",
    body: JSON.stringify(busData),
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to add bus");
  }

  return response.json();
};

// Update bus details (admin functionality)
export const updateBus = async (busData) => {
  const response = await fetch(`${API_URL}/buses/${busData.bus_id}`, {
    method: "PUT",
    body: JSON.stringify(busData),
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to update bus");
  }

  return response.json();
};

// Delete a bus (admin functionality)
export const deleteBus = async (busId) => {
  const response = await fetch(`${API_URL}/buses/${busId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete bus");
  }

  return response.json();
};
