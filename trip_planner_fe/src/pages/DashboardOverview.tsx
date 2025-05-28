import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../css/dashboardOverview.css";

import RouteIcon from "../assets/route-icon.png";

function DashboardOverview() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="overview-container">
        <div className="overview-item-title">
          <h2>Unsere Funktionen</h2>
        </div>

        <div className="overview-item-wrapper">
          <Link to="/dashboard-route-planner" className="overview-item">
            <div className="overview-item-icon-container">
              <img
                src={RouteIcon}
                alt="placeholder"
                className="overview-item-icon"
              />
            </div>
            <div className="overview-item-text">
              <p>Plane deinen nächsten Trip ganz unkompliziert!</p>
            </div>
          </Link>

          <div
            className="overview-item coming-soon"
            onClick={(e) => e.preventDefault()}
          >
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>

          <div
            className="overview-item coming-soon"
            onClick={(e) => e.preventDefault()}
          >
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>

          <div
            className="overview-item coming-soon"
            onClick={(e) => e.preventDefault()}
          >
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
