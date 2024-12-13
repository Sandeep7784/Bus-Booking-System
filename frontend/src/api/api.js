import axios from 'axios';

// Base URL of the backend
const BASE_URL = 'http://localhost:5000/api';

// Function to get the token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');  // Get JWT token from localStorage
};

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header with JWT token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Retrieves the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adds the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// API function to create a new admin (admin role required)
export const createAdmin = async (username, email, password) => {
    try {
      const response = await axiosInstance.post('/admins/create', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Error creating admin';
    }
  };  

// API function to register a new user
export const registerUser = async (username, email, password) => {
  try {
    const response = await axiosInstance.post('/users/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error registering user';
  }
};

// API function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    // Save the JWT token to localStorage on successful login
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error logging in user';
  }
};

// API function to fetch all buses
export const fetchBuses = async () => {
  try {
    const response = await axiosInstance.get('/buses');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching buses';
  }
};

// API function to fetch bus details
export const fetchBusDetails = async (bus_id) => {
  try {
    const response = await axiosInstance.get(`/bus-details/${bus_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching bus details';
  }
};

// API function to create a booking
export const bookSeat = async (user_id, bus_id, seat_number, stop_id) => {
  try {
    const response = await axiosInstance.post('/bookings/book', {
      user_id,
      bus_id,
      seat_number,
      stop_id,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error booking seat';
  }
};

// API function to cancel a booking
export const cancelBooking = async (booking_id) => {
  try {
    const response = await axiosInstance.delete(`/bookings/${booking_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error canceling booking';
  }
};

// API function to fetch trips for a specific user
export const fetchUserTrips = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/trips/${user_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching user trips';
  }
};

// Admin-only API function to fetch all users (admin role required)
export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching users';
  }
};

// Admin-only API function to fetch all trips
export const fetchAllTrips = async () => {
  try {
    const response = await axiosInstance.get('/trips');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching trips';
  }
};

// API function to fetch stops for a specific route
export const fetchStopsForRoute = async (route_id) => {
  try {
    const response = await axiosInstance.get(`/stops/${route_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching stops';
  }
};

// Admin-only API function to create a bus
export const createBus = async (bus_name, total_seats, route_id, days_of_operation = 'Monday, Saturday, Thursday', schedule_time = '09:00:00') => {
  try {
    const response = await axiosInstance.post('/buses/create', {
      bus_name,
      total_seats,
      route_id,
      days_of_operation, // Adding days_of_operation
      schedule_time,     // Adding schedule_time
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error creating bus';
  }
};

// Admin-only API function to update a bus
export const updateBus = async (bus_id, bus_name, total_seats, route_id, days_of_operation, schedule_time) => {
  try {
    const response = await axiosInstance.put(`/buses/${bus_id}`, {
      bus_name,
      total_seats,
      route_id,
      days_of_operation, // Adding days_of_operation
      schedule_time,     // Adding schedule_time
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating bus';
  }
};

// Admin-only API function to delete a bus
export const deleteBus = async (bus_id) => {
  try {
    const response = await axiosInstance.delete(`/buses/${bus_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting bus';
  }
};

export default axiosInstance;
