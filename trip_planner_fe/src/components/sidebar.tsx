import { useEffect, useState } from "react";
import { getRouteByName } from "../api/geoapify/storedRoute";
import { loadRouteNames } from "../api/geoapify/route";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useMap } from "../api/geoapify/mapContext";
import "../css/sidebar.css";
import Logo from "../assets/tripplanr-logo.png";

const Sidebar = () => {
  const { map } = useMap();

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
      <div className="sidebar-link-menu">
        <p className="sidebar-section-title">Favoriten</p>
        <ul>
          {routeNames.length > 0
            ? routeNames.map((name, idx) => (
                <li key={idx}>
                  <NavLink
                    to="/dashboard-route-planner"
                    onClick={() => getRouteByName(name, map!)}
                    className="sidebar-links"
                  >
                    {name}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="sidebar-service-menu">
        <p className="sidebar-section-title">Service</p>
        <NavLink to="/" className="sidebar-links">
          🏠 Home
        </NavLink>
        <NavLink to="/dashboard-route-planner" className="sidebar-links">
          🗺️ Route-Planner
        </NavLink>
        <NavLink to="/places" className="sidebar-links">
          📍 Places
        </NavLink>
      </div>
      <div className="sidebar-footer">
        <Link to={backButtonTarget} className="sidebar-footer-title">
          ← Zurück
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
