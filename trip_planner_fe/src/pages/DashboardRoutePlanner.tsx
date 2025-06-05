import Sidebar from "../components/sidebar";
import Map from "../components/map";
import Input from "../components/mapInput";
import { useState, useEffect, useRef } from "react";
import { useNotification } from "../context/notification/notificationContext.tsx";
import Details from "../components/details.tsx";
import { submitRoute } from "../api/geoapify/route.ts";

import "../css/dashboardRoutePlanner.css";
import { RouteDetails } from "../types/routeDetails.ts";
import { InputAutocomplete } from "../types/inputComplete.ts";

export default function DashboardRoutePlanner() {
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [startInput, setStartInput] = useState<InputAutocomplete | null>(null);
  const [endInput, setEndInput] = useState<InputAutocomplete | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [routeName, setRouteName] = useState("");
  const popupInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("popup-open");
      popupInputRef.current?.focus();
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [showPopup]);

  return (
    <div className="route-planner-wrapper">
      <Sidebar />
      <div className="route-overview-container">
        <h1 className="route-container-title">Plane deine Route!</h1>
        <div className="route-top-wrapper">
          <Input
            setRouteDetails={setRouteDetails}
            startInput={startInput}
            setStartInput={setStartInput}
            endInput={endInput}
            setEndInput={setEndInput}
          />
          {routeDetails && startInput && endInput && (
            <Details
              routeDetails={routeDetails}
              startInput={startInput}
              endInput={endInput}
            />
          )}
        </div>
        <Map />
      </div>

      <button
        className="route-planner-submit-route-button"
        onClick={(e) => {
          e.preventDefault();
          if (!routeDetails) {
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
              ref={popupInputRef}
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Name der Route"
            />
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Abbrechen</button>
              <button
                onClick={() => {
                  if (!routeName.trim()) {
                    addNotification(
                      "Bitte gib einen Namen für die Route ein.",
                      "error"
                    );
                    return;
                  }
                  submitRoute(
                    routeDetails!,
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
