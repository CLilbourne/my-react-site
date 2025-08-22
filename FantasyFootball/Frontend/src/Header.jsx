import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("user");
  setUsername(null);
  window.location.href = "/login"; // fallback redirect
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