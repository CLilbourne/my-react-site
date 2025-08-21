
import "./header.css";
import { Link } from "react-router-dom";
import Ranking from "./Ranking";

function Header() {
  // ✅ Get user from localStorage (same as in DraftRoom)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.name; // may be undefined if not logged in

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">
          <Link to="/">HireConnor.org</Link>
        </div>
      </div>

      <nav className="header-nav">
        {username ? (
          // ✅ Logged in: show username linking to Welcome
          <Link to="/welcome">{username}</Link>
        ) : (
          // ❌ Not logged in: show original nav
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/AboutMe">About Me</Link>
            <Link to="/mock-draft">Mock Draft</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;