import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  fetchBuses, 
  getUserProfile, 
  fetchUserBookings, 
  cancelBooking  // Add this import for cancellation
} from '../api/api';
import SeatSelector from "../components/SeatSelector";
import BookingStatus from "../components/BookingStatus";

const BusDetailsPage = () => {
  const { bus_id } = useParams();
  const navigate = useNavigate();
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [buses, setBuses] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const [busDetails, setBusDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getBusDetails = async () => {
      try {
        const data = await fetchBuses();
        setBuses(data);
        const userData = await getUserProfile();
        setUser(userData);

        if (!userData) {
          return <div>Loading...</div>; 
        }
        if (!data) {
          return <div>Loading...</div>; 
        }

        const userTripsData = await fetchUserBookings(userData.user_id);
        setUserTrips(userTripsData);

        // Assuming the first bus in the list matches the current bus_id
        const currentBusDetails = data.find(bus => bus.bus_id === bus_id);
        setBusDetails(currentBusDetails);

        // Calculate available seats
        setAvailableSeats(currentBusDetails.total_seats - currentBusDetails.current_occupancy);
      } catch (err) {
        console.log("");
      }
    };
    getBusDetails();
  }, [bus_id]);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBooking = async () => {
    if (!selectedSeat) {
      setError("Please select a seat");
      return;
    }
    try {
      // Assuming the user is logged in and the necessary data is available
      // Implement your booking logic here (e.g., call bookSeat API)
      setSuccessMessage("Booking successful!");
      setError("");
      navigate("/"); // Redirect to home page after successful booking
    } catch (err) {
      setError("Error booking seat");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      
      // Refresh user trips after cancellation
      const updatedTrips = await fetchUserBookings(user.user_id);
      setUserTrips(updatedTrips);
      
      setSuccessMessage("Booking cancelled successfully");
    } catch (err) {
      window.location.reload();    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <BookingStatus status="error" message={error} />}
      {successMessage && (
        <BookingStatus status="success" message={successMessage} />
      )}
      
      {/* User Trips Table */}
      {userTrips && userTrips.length > 0 && (
        <div className="mt-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold p-4">Your Bookings</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Booking ID</th>
                <th className="p-2 text-left">Bus ID</th>
                <th className="p-2 text-left">Seat Number</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTrips.map((trip) => (
                <tr key={trip.booking_id} className="border-b">
                  <td className="p-2 text-center">{trip.booking_id}</td>
                  <td className="p-2 text-center">{trip.bus_id}</td>
                  <td className="p-2 text-center">{trip.seat_number}</td>
                  <td className="p-2 text-center">{trip.status}</td>
                  <td className="p-2 text-center">
                    {trip.status === 'booked' && (
                      <button
                        onClick={() => handleCancelBooking(trip.booking_id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#ffffff', 
                          padding: '4px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'} 
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bus Details and Seat Selection */}
      {busDetails && (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
          <h2 className="text-2xl font-semibold">{busDetails.bus_name}</h2>
          <p className="text-gray-600">Schedule: {busDetails.schedule_time}</p>
          <p className="text-gray-600">Total Seats: {busDetails.total_seats}</p>
          <p className="text-gray-600">
            Available Seats:{" "}
            {busDetails.total_seats - busDetails.current_occupancy}
          </p>
          <SeatSelector
            availableSeats={availableSeats}
            onSeatSelect={handleSeatSelect}
          />
          <button
            onClick={handleBooking}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Seat
          </button>
        </div>
      )}
    </div>
  );
};

export default BusDetailsPage;