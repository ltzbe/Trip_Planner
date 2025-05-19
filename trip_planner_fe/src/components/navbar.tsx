import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
        <Link className="navbar-login-btn" to="/login">
          Login
        </Link>
        <Link className="navbar-register-btn" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
