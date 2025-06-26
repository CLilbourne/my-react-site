
import "./Header.css"; // Make sure this file exists

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title"><a href="/">HireConnor.org</a></div>
      </div>
      <nav className="header-nav">
        <a href="login">Login Server not Live (GIT)</a>
        <a href="register">Register Server not Live (GIT)</a>
        <a href="AboutMe">About Me</a>
        <a href="mock-draft">Mock Server not Live (GIT)</a>
      </nav>
    </header>
  );
}

export default Header;