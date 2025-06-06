import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";

import "../css/routeSettings.css";
import { handleGetRoute } from "../api/geoapify/route.ts";
import { useMap } from "../api/geoapify/mapContext.tsx";
import { RouteFeature } from "../types/routeDetails.ts";
import React, { useState } from "react";
import { InputAutocomplete } from "../types/inputComplete.ts";
import { useNotification } from "../context/notification/notificationContext.tsx";
import {
  DEFAULT_FUEL_THRESHOLD_KM,
  DEFAULT_HOTEL_THRESHOLD_KM,
} from "../config/constants.ts";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1;

type Props = {
  setRoute: React.Dispatch<React.SetStateAction<RouteFeature | null>>;
  startInput: InputAutocomplete | null;
  setStartInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>;
  endInput: InputAutocomplete | null;
  setEndInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>
  setHotelsData: React.Dispatch<React.SetStateAction<RouteFeature[][]>>
};

const MapInput = ({
  setRoute,
  startInput,
  setStartInput,
  endInput,
  setEndInput,
  setHotelsData
}: Props) => {
  const [settings, setSettings] = useState({
    isHotelsChecked: false,
    hotelThresholdKM: null,
    isFuelChecked: false,
    fuelThresholdKM: null,
  });
  const { map } = useMap();
  const { addNotification } = useNotification();
  const [dropdownState, setDropdownState] = useState({
    open: false,
    tankstellenExpanded: false,
    unterkunftExpanded: false,
  });

  async function onPlaceSelectStart(value: InputAutocomplete) {
    if (!map || !value?.properties?.lon || !value?.properties?.lat) return;

    map.jumpTo({
      center: [value.properties.lon, value.properties.lat],
      zoom: 10,
    });
    setStartInput(value);

    if (!endInput) return;
    if (!validateSettings()) return;

    const result = await handleGetRoute(map, value, endInput, settings);
    const route = result?.data;
    const hotelsData = result?.hotelsData
    setRoute(route);

    setHotelsData([...(hotelsData ?? [])]);
  }

  async function onPlaceSelectEnd(value: InputAutocomplete) {
    setEndInput(value);

    if (
      !map ||
      !value?.properties?.lon ||
      !value?.properties?.lat ||
      !startInput
    )
      return;
    if (!validateSettings()) return;

    const result = await handleGetRoute(map, startInput, value, settings);
    const route = result?.data;
    const hotelsData = result?.hotelsData
    setRoute(route);

    setHotelsData([...(hotelsData ?? [])]);
  }

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setSettings((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  };

  async function handleRouteSettingsSubmit() {
    if (map && startInput && endInput && validateSettings()) {
      const result = await handleGetRoute(map, startInput, endInput, settings);
      const routeDetails = result?.data;
      const hotelsHere = result?.hotelsData
      if(hotelsHere == undefined){
        return "error"
      }
      setRoute(routeDetails);
      console.log(hotelsHere, "hotels here")
      setHotelsData(hotelsHere);
    }
  }

  function validateSettings() {
    if (
      settings.isHotelsChecked &&
      settings.hotelThresholdKM &&
      settings.hotelThresholdKM <= 0
    ) {
      addNotification(
        "Distanz zwischen Unterkünften muss mindestens 1 sein",
        "error"
      );
      return false;
    }
    if (
      settings.isFuelChecked &&
      settings.fuelThresholdKM &&
      settings.fuelThresholdKM <= 0
    ) {
      addNotification(
        "Durchschnittliche Tankreichweite muss mindestens 1 sein",
        "error"
      );
      return false;
    }
    return true;
  }

  return (
    <div className="route-input-wrapper">
      <div className="input-container">
        <GeoapifyContext apiKey={GEO_API_KEY}>
          <div className="address-input-wrapper">
            <h2 className="input-label">Start</h2>
            <div className="input-field">
              <GeoapifyGeocoderAutocomplete placeSelect={onPlaceSelectStart} />
            </div>
          </div>

          <div className="address-input-wrapper">
            <h2 className="input-label">Ziel</h2>
            <div className="input-field">
              <GeoapifyGeocoderAutocomplete placeSelect={onPlaceSelectEnd} />
            </div>
          </div>
        </GeoapifyContext>

        <div className="settings-and-submit">
          <div className="settings-dropdown-wrapper">
            <button
              className="dropdown-menu-button"
              onClick={() =>
                setDropdownState((prev) => ({ ...prev, open: !prev.open }))
              }
            >
              ⚙️ Settings
            </button>
            {dropdownState.open && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <div className="dropdown-label">
                    <p>⛽️ Tankstellen:</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.isFuelChecked}
                        onChange={(e) => {
                          handleSettingsChange(e);
                          setDropdownState((prev) => ({
                            ...prev,
                            tankstellenExpanded: e.target.checked,
                          }));
                        }}
                        name="isFuelChecked"
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {dropdownState.tankstellenExpanded && (
                    <div className="dropdown-sub">
                      <div className="dropdown-sub-item">
                        <p>Durchschnittliche Tankreichweite in km</p>
                        <input
                          type="number"
                          min={50}
                          disabled={!settings.isFuelChecked}
                          onChange={handleSettingsChange}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]|Backspace|ArrowLeft|ArrowRight/.test(
                                e.key
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          name="hotelThresholdKM"
                          placeholder={`${DEFAULT_FUEL_THRESHOLD_KM}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="dropdown-item">
                  <div className="dropdown-label">
                    <p>🛏️ Unterkunft:</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.isHotelsChecked}
                        onChange={(e) => {
                          handleSettingsChange(e);
                          setDropdownState((prev) => ({
                            ...prev,
                            unterkunftExpanded: e.target.checked,
                          }));
                        }}
                        name="isHotelsChecked"
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  {dropdownState.unterkunftExpanded && (
                    <div className="dropdown-sub">
                      <div className="dropdown-sub-item">
                        <p>Distanz in km</p>
                        <input
                          type="number"
                          min={50}
                          disabled={!settings.isHotelsChecked}
                          onChange={handleSettingsChange}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]|Backspace|ArrowLeft|ArrowRight/.test(
                                e.key
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          name="hotelThresholdKM"
                          placeholder={`${DEFAULT_HOTEL_THRESHOLD_KM}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="route-input-submit-button"
            onClick={handleRouteSettingsSubmit}
          >
            Anwenden
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapInput;
