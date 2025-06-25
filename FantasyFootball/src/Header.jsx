
import "./Header.css"; // Make sure this file exists

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">HireConnor.org</h1>
      </div>
      <nav className="header-nav">
        <a href="login">Login</a>
        <a href="#">League</a>
        <a href="#">Stats</a>
        <a href="#">Settings</a>
      </nav>
    </header>
  );
}

export default Header;