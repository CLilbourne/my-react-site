import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [username, setUsername] = useState(null);

  // Load user from localStorage
  useEffect(() => {
  const updateUsername = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUsername(storedUser?.name || null);
  };

  updateUsername(); // initial load

  window.addEventListener("storageUpdated", updateUsername);
  return () => window.removeEventListener("storageUpdated", updateUsername);
}, []);

  const handleLogout = () => {
  localStorage.removeItem("user");
  setUsername(null);
  window.dispatchEvent(new Event("storageUpdated"));
};

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">
          <Link to="/">HireConnor.org</Link>
        </div>
      </div>

      <nav className="header-nav">
        {username ? (
          <>
            <Link to="/mock-draft">Mock Draft</Link>
            <Link to="/welcome">{username.toUpperCase()}</Link>
            <a href="#" className="logout-link" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/mock-draft">Mock Draft</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;