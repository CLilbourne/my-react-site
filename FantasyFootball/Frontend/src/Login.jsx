import React, { useState } from "react";
import "./signup.css"; // reuse same styles
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./shared";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new: track loading state
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
      setLoading(true); // ✅ disable button + show loading state
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        setError("");

        // ✅ persist user info in localStorage so refresh doesn’t lose it
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ navigate without needing to pass username in state anymore
        navigate("/welcome");
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Network error");
    } finally {
      setLoading(false); // ✅ stop loading
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
          <button
            type="submit"
            className="signup-button"
            disabled={loading} // ✅ prevent double submits
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="signup-footer">
          Don&apos;t have an account?{" "}
          {/* ✅ use Link instead of <a> to avoid page reload */}
          <a href="/register" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;