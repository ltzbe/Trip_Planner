import Sidebar from "../components/sidebar";
import "../css/dashboardRoutePlanner.css";

function DashboardOverview() {

  return (
    <div className="dashboard-wrappers">
      <Sidebar />
      <div className={"overview-container"}>
        <div className="overview-item-title">
          <h2>Unsere Funktionen</h2>
        </div>
        <div className="overview-item-wrapper">
          <div className="overview-item">
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-item-icon">
              <img src="#" alt="placeholder" />
            </div>
            <div className="overview-item-text">
              <p>Hallo</p>
            </div>
          </div>

          <div className="overview-item">
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
