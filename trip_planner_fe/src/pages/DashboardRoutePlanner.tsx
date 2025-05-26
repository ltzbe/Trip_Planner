import Sidebar from "../components/sidebar";
import Map from "../components/map";
import Input from "../components/mapInput";

import "../css/dashboardRoutePlanner.css";

export default function DashboardRoutePlanner() {

  return (
    <div className="route-planner-wrapper">
      <Sidebar />
      <div className="route-overview-container">
        <Input />
        <Map />
      </div>
    </div>
  );
}


