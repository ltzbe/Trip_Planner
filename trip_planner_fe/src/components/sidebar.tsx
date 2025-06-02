import { NavLink, Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";
import Logo from "../assets/tripplanr-logo.png";
// import UserIcon from "../assets/user.png";

const Sidebar = () => {
  const location = useLocation();
  const backButtonTarget =
    location.pathname === "/dashboard-overview" ? "/" : "/dashboard-overview";
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-menu">
        <p className="sidebar-section-title">Favoriten</p>
        <ul>
          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive ? "sidebar-links active" : "sidebar-links"
              }
            >
              Route 1
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "sidebar-links active" : "sidebar-links"
              }
            >
              Route 2
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? "sidebar-links active" : "sidebar-links"
              }
            >
              Route 3
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                isActive ? "sidebar-links active" : "sidebar-links"
              }
            >
              Route 4
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                isActive ? "sidebar-links active" : "sidebar-links"
              }
            >
              Route 5
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <Link to={backButtonTarget} className="sidebar-footer-title">
          ← Verlassen
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
