import React, { useState } from "react";

export default function RegistrationOverlay({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5050/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setTimeout(onClose, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-70 p-8 rounded shadow-xl w-[90%] max-w-md relative">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl mb-4 font-semibold text-center">Register</h2>
        {message && <p className="text-sm text-center mb-2 text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="firstName" required onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="First Name" />
          <input type="text" name="middleName" onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Middle Name (Optional)" />
          <input type="text" name="lastName" required onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Last Name" />
          <input type="text" name="contactNumber" required onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Contact Number" />
          <input type="email" name="email" onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Email ID (Optional)" />
          <input type="text" name="username" required onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Username" />
          <input type="password" name="password" required onChange={handleChange}
            className="w-full p-2 border rounded" placeholder="Password" />

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
