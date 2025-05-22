import { Link, useLocation } from "react-router-dom";
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
          <Link className="navbar-links" to="/">Home</Link>
          <Link className="navbar-links" to="/about">About</Link>
          <Link className="navbar-links" to="/services">Services</Link>
          <Link className="navbar-links" to="/contact">Contact</Link>
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
