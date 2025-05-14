import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar () {
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img src="/assets/logotest.png" alt="Logo" width={50}/>
            </div>
            <div className="navbar_links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    )
}
export default NavBar