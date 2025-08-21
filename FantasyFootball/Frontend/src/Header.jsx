
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  // ✅ Get user from localStorage (same as in DraftRoom)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.name; // may be undefined if not logged in

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title"><a href="/">HireConnor.org</a> </div>
      </div>

      <nav className="header-nav">
        {username ? (
          // ✅ Logged in: show username linking to Welcome
          <>
          <a href="/welcome">{username.toUpperCase()}</a>
          <a href="AboutMe">About Me</a>
          <a href="mock-draft">Mock Draft</a>

          </>
        ) : (
          // ❌ Not logged in: show original nav
          <>
            <a href="login">Login</a>
            <a href="register">Register</a>
            <a href="AboutMe">About Me</a>
            <a href="mock-draft">Mock Draft</a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;