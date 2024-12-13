import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchBusDetails } from "../api/api";
import SeatSelector from "../components/SeatSelector";
import BookingStatus from "../components/BookingStatus";

const BusDetailsPage = () => {
  const { bus_id } = useParams();
  const navigate = useNavigate();

  const [busDetails, setBusDetails] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getBusDetails = async () => {
      try {
        const data = await fetchBusDetails(bus_id);
        setBusDetails(data);
        // Assuming the response contains a list of available seat numbers
        setAvailableSeats(data.availableSeats);
      } catch (err) {
        setError("Error fetching bus details");
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

  return (
    <div className="container mx-auto p-4">
      {error && <BookingStatus status="error" message={error} />}
      {successMessage && (
        <BookingStatus status="success" message={successMessage} />
      )}

      {busDetails && (
        <div className="bg-white shadow-lg rounded-lg p-4">
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
