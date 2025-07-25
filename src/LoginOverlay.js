import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginOverlay({ onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // ✅ correct keys
    });


      if (res.ok) {
        const data = await res.json();
        console.log("Login success:", data);
        if (onSuccess) onSuccess(); // ✅ trigger callback if passed
        navigate("/dashboard");
      } else {
        const errData = await res.json();
        setError(errData.message || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="#" className="text-blue-600">Register</a>
        </p>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline w-full text-center">
          Close
        </button>
      </div>
    </div>
  );
}
