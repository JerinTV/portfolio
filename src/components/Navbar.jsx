import logo from "../assets/logo.png.jpeg";

function Navbar({ links }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src={logo} alt="Logo" className="logo-img" />

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
