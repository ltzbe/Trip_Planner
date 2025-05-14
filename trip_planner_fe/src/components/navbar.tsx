import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/assets/logotest.png" alt="Logo" className='logo'/>
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-right">
        <Link className="login-btn" to='/login'>Login</Link>
        <Link className="register-btn" to='/register'>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;