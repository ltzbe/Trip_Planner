import { Link } from "react-router-dom";
import Sidebar from "../components/navigation/sidebar.tsx";
import "../css/dashboard/dashboardOverview.css";

// import RouteIcon from "../assets/route-icon.png";

function DashboardOverview() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="overview-container">
        <div className="overview-item-title">
          <h2>Unsere Funktionen</h2>
        </div>

        <div className="overview-item-wrapper">
          <div className="overview-card">
            <div className="overview-icon">🗺️</div>
            <h3 className="overview-title">Route Planner</h3>
            <p className="overview-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="overview-button">
              Zum Planner
            </Link>
          </div>

          <div className="overview-card">
            <div className="overview-icon">📍</div>
            <h3 className="overview-title">Places</h3>
            <p className="overview-text">
              Finde die besten Restaurants, Sehenswürdigkeiten und vieles mehr!
            </p>
            <Link to="/places" className="overview-button">
              Jetzt entdecken
            </Link>
          </div>

          <div className="overview-card coming-soon">
            <div className="overview-icon">🚀</div>
            <h3 className="overview-title">Route Planner</h3>
            <p className="overview-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="overview-button">
              Jetzt upgraden
            </Link>
          </div>

          <div
            className="overview-card coming-soon"
            onClick={(e) => e.preventDefault()}
          >
            <div className="overview-icon">🚀</div>
            <h3 className="overview-title">Route Planner</h3>
            <p className="overview-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="overview-button">
              Jetzt upgraden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
