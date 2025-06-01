import Sidebar from "../components/sidebar";
import Map from "../components/map";
import Input from "../components/mapInput";
import { useState } from "react";
import { useNotification } from "../auth/notificationContext";
import Details from "../components/details.tsx";
import { submitRoute } from "../api/geoapify/route.ts";

import "../css/dashboardRoutePlanner.css";
import { RouteDetails } from "../types/routeDetails.ts";
import { InputAutocomplete } from "../types/inputComplete.ts";

export default function DashboardRoutePlanner() {
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [startInput, setStartInput] = useState<InputAutocomplete | null>(null);
  const [endInput, setEndInput] = useState<InputAutocomplete | null>(null);
  const { addNotification } = useNotification();

  return (
    <div className="route-planner-wrapper">
      <Sidebar />
      <div className="route-overview-container">
        <h1>Plane deine Route!</h1>
        <Input
          setRouteDetails={setRouteDetails}
          startInput={startInput}
          setStartInput={setStartInput}
          endInput={endInput}
          setEndInput={setEndInput}
        />
        <Map />
        {routeDetails && startInput && endInput && (
          <Details
            routeDetails={routeDetails}
            startInput={startInput}
            endInput={endInput}
          />
        )}
      </div>

      <button
        className="route-planner-submit-route-button"
        onClick={(e) => {
          e.preventDefault();
          if (!routeDetails) {
            addNotification("Bitte zuerst eine Route berechnen.", "error");
            return;
          }
          submitRoute(routeDetails)
            .then((res) => console.log("Route gespeichert:", res))
            .catch((err) => console.error("Fehler:", err));
        }}
      >
        Route speichern
      </button>
    </div>
  );
}
