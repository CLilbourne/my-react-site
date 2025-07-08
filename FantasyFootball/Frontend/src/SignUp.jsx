import React, { useState } from "react";
import "./signup.css";

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = form;

  if (!name || !email || !password || !confirmPassword) {
    return setError("All fields are required.");
  }
  if (password.length < 6) {
    return setError("Password must be at least 6 characters.");
  }
  if (password !== confirmPassword) {
    return setError("Passwords do not match.");
  }

  try {
    const res = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed.");
    } else {
      alert("Signup successful!");
    }
  } catch (err) {
    setError("Server error. Try again later.");
    console.error(err);
  }
};

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Create an Account</h2>
        {error && <div className="signup-error">{error}</div>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/login" className="signup-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;