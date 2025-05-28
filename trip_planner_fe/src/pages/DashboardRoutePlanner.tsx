import Sidebar from "../components/sidebar";
import Map from "../components/map";
import Input from "../components/mapInput";
import {useState} from "react";
import Details from "../components/details.tsx";

import "../css/dashboardRoutePlanner.css";

export default function DashboardRoutePlanner() {
    const [routeDetails, setRouteDetails] = useState()

  return (
    <div className="route-planner-wrapper">
      <Sidebar />
      <div className="route-overview-container">
          <h1>Plane deine Route!</h1>
        <Input setRouteDetails={setRouteDetails}/>
        <Map />
        <Details routeDetails={routeDetails}/>
      </div>
    </div>
  );
}


