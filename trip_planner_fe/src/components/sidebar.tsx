import { useEffect, useState } from "react";
import { loadRouteNames, getRouteByName } from "../api/geoapify/route";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";
import Logo from "../assets/tripplanr-logo.png";
// import UserIcon from "../assets/user.png";

const Sidebar = () => {
  const location = useLocation();
  const backButtonTarget =
    location.pathname === "/dashboard-overview" ? "/" : "/dashboard-overview";

  const [routeNames, setRouteNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchRouteNames = async () => {
      const result = await loadRouteNames();
      if (Array.isArray(result)) {
        setRouteNames(result);
      } else {
        throw new Error("Fehler beim Laden der Routen:");
      }
    };
    fetchRouteNames();
  }, []);

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-menu">
        <p className="sidebar-section-title">Favoriten</p>
        <ul>
          {routeNames.length > 0
            ? routeNames.map((name, idx) => (
                <li key={idx}>
                  <NavLink
                    to="/dashboard-route-planner"
                    onClick={() => getRouteByName(name)}
                    className="sidebar-links"
                  >
                    {name}
                  </NavLink>
                </li>
              ))
            : null}
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
