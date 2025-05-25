import Sidebar from "../components/sidebar";
import Map from "../components/map";
import "../css/dashboardRoutePlanner.css";

function DashboardOverview() {

  return (
    <div className="dashboard-wrappers">
      <Sidebar />
      <div className="overview-container">
        <Map />
          
      </div>
    </div>
  );
}

export default DashboardOverview;
