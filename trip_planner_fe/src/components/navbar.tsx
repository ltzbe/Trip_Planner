import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const showAuthButtons = location.pathname !== "/dashboard";

  return (
    <nav className="navbar">
      <div className="navbar-left">
          <img src="/assets/logotest.png" alt="Logo" className="navbar-logo" />
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
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
