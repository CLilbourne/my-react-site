import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./shared";
import bcrypt from "bcryptjs"; // ✅ import bcrypt

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Hash password before sending
      const hashedPassword = bcrypt.hashSync(form.password, 10);

      const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: hashedPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storageUpdated"));
        navigate("/welcome");
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Log In</h2>
        {error && <div className="signup-error">{error}</div>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="signup-input" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="signup-input" />
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="signup-footer">
          Don&apos;t have an account? <a href="/register" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;