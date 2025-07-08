
import "./header.css"; // Make sure this file exists

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title"><a href="/">HireConnor.org</a></div>
      </div>
      <nav className="header-nav">
        <a href="login">Login</a>
        <a href="register">Register</a>
        <a href="AboutMe">About Me</a>
        <a href="mock-draft">Mock Draft</a>
      </nav>
    </header>
  );
}

export default Header;