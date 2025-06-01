import { Link } from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/">
            <img
              src="../assets/tripplanr-logo.png"
              alt="Logo"
              className="footer-logo"
            />
          </Link>
        </div>

        <div className="footer-right">
          <p>&copy; 2025 TRIPPLANR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
