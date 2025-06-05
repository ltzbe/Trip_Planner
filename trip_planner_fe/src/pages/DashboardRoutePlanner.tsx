import Sidebar from "../components/sidebar";
import Map from "../components/map";
import Input from "../components/mapInput";
import { useState } from "react";
import { useNotification } from "../context/notification/notificationContext.tsx";
import Details from "../components/details.tsx";
import { submitRoute } from "../api/geoapify/route.ts";

import "../css/dashboardRoutePlanner.css";
import { RouteFeature} from "../types/routeDetails.ts";
import { InputAutocomplete } from "../types/inputComplete.ts";

export default function DashboardRoutePlanner() {
  const [route, setRoute] = useState<RouteFeature | null>(null);
  const [startInput, setStartInput] = useState<InputAutocomplete | null>(null);
  const [endInput, setEndInput] = useState<InputAutocomplete | null>(null);
  const { addNotification } = useNotification();


  const [showPopup, setShowPopup] = useState(false);
  const [routeName, setRouteName] = useState("");

  return (
    <div className="route-planner-wrapper">
      <Sidebar />
      <div className="route-overview-container">
        <h1>Plane deine Route!</h1>
        <Input
          setRoute={setRoute}
          startInput={startInput}
          setStartInput={setStartInput}
          endInput={endInput}
          setEndInput={setEndInput}
        />
        <Map />
        {route && startInput?.properties?.address_line1 && endInput?.properties?.address_line1 && (
          <Details
            route={route}
            startName={startInput.properties.address_line1}
            endName={endInput.properties.address_line1}
          />
        )}
      </div>

      <button
        className="route-planner-submit-route-button"
        onClick={(e) => {
          e.preventDefault();
          if (!route) {
            addNotification("Bitte zuerst eine Route berechnen.", "error");
            return;
          }
          setShowPopup(true);
        }}
      >
        Route speichern
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Route benennen</h2>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Name der Route"
            />
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Abbrechen</button>
              <button
                onClick={() => {
                  if (!routeName.trim() || !route) {
                    addNotification(
                      "Bitte gib einen Namen für die Route ein.",
                      "error"
                    );
                    return;
                  }
                  submitRoute(
                    route,
                    routeName,
                    startInput!,
                    endInput!
                  ).then((result) => {
                    switch (result) {
                      case "success":
                        addNotification(
                          "Route erfolgreich gespeichert.",
                          "success"
                        );
                        break;
                      case "unauthenticated":
                        addNotification("Du bist nicht angemeldet.", "error");
                        break;
                      case "error":
                      default:
                        addNotification(
                          "Route konnte nicht gespeichert werden.",
                          "error"
                        );
                        break;
                    }
                    setShowPopup(false);
                  });
                }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
