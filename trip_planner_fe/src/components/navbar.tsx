import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/navbar.css";
import Logo from "../assets/tripplanr-logo.png";
import { useAuth } from "../auth/authContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-links active" : "navbar-links"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-links active" : "navbar-links"
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-links active" : "navbar-links"
          }
          to="/services"
        >
          Services
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-links active" : "navbar-links"
          }
          to="/dashboard-overview"
        >
          Dash
        </NavLink>
      </div>

      <div className="navbar-right">
        {!token ? (
          <Link className="navbar-login-btn" to="/login">
            Login
          </Link>
        ) : (
          <button className="navbar-logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
