import React, { useState } from "react";
import "./SignUp.css"; // reuse same styles
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        setError("");
        // Navigate to welcome and pass username in state
        navigate("/welcome", { state: { username: data.user.name } });
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Network error");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Log In</h2>
        {error && <div className="signup-error">{error}</div>}
        <form onSubmit={handleSubmit} className="signup-form">
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
          <button type="submit" className="signup-button">
            Log In
          </button>
        </form>
        <p className="signup-footer">
          Don't have an account?{" "}
          <a href="/register" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;