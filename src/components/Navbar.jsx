import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png.jpeg";

function Navbar({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="brand-wrap" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="brand-copy">
            <span className="brand-name">Jerin T V</span>
            <span className="brand-sub">Creative Frontend Portfolio</span>
          </div>
        </a>

        <button
          type="button"
          className={`nav-toggle ${isOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta" onClick={() => setIsOpen(false)}>
          Let&apos;s Talk <FaArrowRight />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
