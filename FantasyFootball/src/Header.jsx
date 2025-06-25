
import "./Header.css"; // Make sure this file exists

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">HireConnor.org</h1>
      </div>
      <nav className="header-nav">
        <a href="login">Login (Server not Live ATM)</a>
        <a href="register">Register (Server not Live ATM)</a>
        <a href="AboutMe">About Me</a>
        <a href="#">Settings (Server not Live ATM)</a>
      </nav>
    </header>
  );
}

export default Header;