import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/assets/logotest.png" alt="Logo" className='navbar-logo'/>
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link className="login-btn" to='/login'>Login</Link>
        <Link className="register-btn" to='/register'>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;