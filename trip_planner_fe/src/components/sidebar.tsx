import { NavLink, Link } from "react-router-dom";
import "../css/sidebar.css";

import UserIcon from "../assets/user.png";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src={UserIcon} alt="user-icon" className="sidebar-logo" />
        <h2>Jonas</h2>
      </div>
      <ul className="sidebar-menu-">
        <p className="sidebar-menu-title">Your Routes</p>
        <li>
          <NavLink
            to="/dashboard-overview"
            className={({ isActive }) =>
              isActive ? "sidebar-links active" : "sidebar-links"
            }
          >
            Route 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-overview"
            className={({ isActive }) =>
              isActive ? "sidebar-links active" : "sidebar-links"
            }
          >
            Route 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-overview"
            className={({ isActive }) =>
              isActive ? "sidebar-links active" : "sidebar-links"
            }
          >
            Route 3
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-menu-title">
          ← Verlassen
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
