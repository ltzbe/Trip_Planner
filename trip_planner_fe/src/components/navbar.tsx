import { Link, NavLink, useLocation } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/tripplanr-logo.png";

const Navbar = () => {
  const location = useLocation();
  const showAuthButtons = location.pathname !== "/dashboard";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        </Link>

      </div>

      <div className="navbar-center">
          <NavLink className={({ isActive }) => isActive ? "navbar-links active" : "navbar-links"} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? "navbar-links active" : "navbar-links"} to="/about">About</NavLink>
          <NavLink className={({ isActive }) => isActive ? "navbar-links active" : "navbar-links"} to="/services">Services</NavLink>
          <NavLink className={({ isActive }) => isActive ? "navbar-links active" : "navbar-links"} to="/dashboard">Dash</NavLink>
      </div>

      <div className="navbar-right">
        {showAuthButtons ? (
          <>
            <Link className="navbar-login-btn" to="/login">
              Login
            </Link>
          </>
        ) : (
          <Link className="navbar-logout-btn" to="/login">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
