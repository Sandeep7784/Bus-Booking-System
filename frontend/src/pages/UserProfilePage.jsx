import React, { useState, useEffect } from "react";
import { getAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate("/login");
        }
        const response = await getUserProfile();
        // console.log(response);
        setUser(response);
      } catch (err) {
        setError("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      {user && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <p className="text-gray-600">Username: {user.username}</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">user_id: {user.user_id}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
