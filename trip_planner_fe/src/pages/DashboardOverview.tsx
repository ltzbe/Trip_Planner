import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../css/dashboardOverview.css";

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
          <div className="boost-card">
            <div className="boost-icon">🗺️</div>
            <h3 className="boost-title">Route Planner</h3>
            <p className="boost-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="boost-button">
              Zum Planner
            </Link>
          </div>

          <div className="boost-card">
            <div className="boost-icon">📍</div>
            <h3 className="boost-title">Places</h3>
            <p className="boost-text">
              Finde die besten Restaurants, Sehenswürdigkeiten und vieles mehr!
            </p>
            <Link to="/places" className="boost-button">
              Jetzt entdecken
            </Link>
          </div>

          <div className="boost-card coming-soon">
            <div className="boost-icon">🚀</div>
            <h3 className="boost-title">Route Planner</h3>
            <p className="boost-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="boost-button">
              Jetzt upgraden
            </Link>
          </div>

          <div
            className="boost-card coming-soon"
            onClick={(e) => e.preventDefault()}
          >
            <div className="boost-icon">🚀</div>
            <h3 className="boost-title">Route Planner</h3>
            <p className="boost-text">
              Plane deinen nächsten Trip ganz unkompliziert!
            </p>
            <Link to="/dashboard-route-planner" className="boost-button">
              Jetzt upgraden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
