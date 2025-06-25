
import "./Header.css"; // Make sure this file exists

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">PlayBenched.com</h1>
      </div>
      <nav className="header-nav">
        <a href="#">My Team</a>
        <a href="#">League</a>
        <a href="#">Stats</a>
        <a href="#">Settings</a>
      </nav>
    </header>
  );
}

export default Header;