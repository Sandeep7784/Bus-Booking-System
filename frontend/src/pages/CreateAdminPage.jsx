import React, { useState } from "react";
import { createAdmin } from "../api/api";

const CreateAdminPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const result = await createAdmin(username, email, password);
      setSuccessMessage(result.message);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Error creating admin");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Create New Admin</h1>
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <form
        className="bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleCreateAdmin}
      >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default CreateAdminPage;
