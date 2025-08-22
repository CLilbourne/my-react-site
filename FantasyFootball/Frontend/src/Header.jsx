import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [username, setUsername] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
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
          <div className="header-nav-items">
            <Link to="/mock-draft">Mock aDraft</Link>
            <Link to="/welcome">{username.toUpperCase()}</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="header-nav-items">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;