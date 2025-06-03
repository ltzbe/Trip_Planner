import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
import "../css/routeSettings.css"
import {handleGetRoute} from "../api/geoapify/route.ts";
import {useMap} from "../api/geoapify/mapContext.tsx";
import {RouteDetails} from "../types/routeDetails.ts";
import React, {useState} from "react";
import {InputAutocomplete} from "../types/inputComplete.ts";
import {useNotification} from "../context/notification/notificationContext.tsx";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1

type Props = {
  setRouteDetails: React.Dispatch<React.SetStateAction<RouteDetails | null>>;
  startInput: InputAutocomplete | null;
  setStartInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>;
  endInput: InputAutocomplete | null;
  setEndInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>
};

const App = ({setRouteDetails, startInput, setStartInput, endInput, setEndInput} : Props) => {
  const [settings, setSettings] = useState({
    isHotelsChecked: false,
    hotelThresholdKM: null,
    isFuelChecked: false,
    fuelThresholdKM: null
  })
  const {map} = useMap()
  const { addNotification } = useNotification();

  async function onPlaceSelectStart(value: InputAutocomplete) {
    if (!map || !value?.properties?.lon || !value?.properties?.lat) return;

    map.jumpTo({center: [value.properties.lon, value.properties.lat], zoom: 10})
    setStartInput(value)

    if (!endInput) return
    if (!validateSettings()) return

    setRouteDetails( await handleGetRoute(map, value, endInput, settings));
  }

  async function onPlaceSelectEnd(value: InputAutocomplete){
    setEndInput(value)

    if (!map || !value?.properties?.lon || !value?.properties?.lat || !startInput) return;
    if (!validateSettings()) return

    setRouteDetails( await handleGetRoute(map, startInput, value, settings));
  }

  function onSuggectionChange(value: GeoJSON.Feature) {
    console.log(value);
  }

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value, type, checked } = e.target;

    setSettings((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  }

  async function handleRouteSettingsSubmit(){
    if(map && startInput && endInput && validateSettings()){
      const routeDetails = await handleGetRoute(map, startInput, endInput, settings)
      setRouteDetails(routeDetails)
    }
  }

  function validateSettings(){
    if(settings.isHotelsChecked && settings.hotelThresholdKM && settings.hotelThresholdKM <= 0){
      addNotification("Distanz zwischen Unterkünften muss mindestens 1 sein", "error")
      return false
    }
    if(settings.isFuelChecked && settings.fuelThresholdKM && settings.fuelThresholdKM <= 0){
      addNotification("Durchschnittliche Tankreichweite muss mindestens 1 sein", "error")
      return false
    }
    return true
  }


  return (
    <>
      <div className="input-container">
        <GeoapifyContext apiKey={GEO_API_KEY}>
          <div className="address-input-wrapper">
            <h2>Start</h2>
            <GeoapifyGeocoderAutocomplete
              placeSelect={onPlaceSelectStart}
              suggestionsChange={onSuggectionChange}
            />
          </div>

          <div className="address-input-wrapper">
            <h2>Ziel</h2>
            <GeoapifyGeocoderAutocomplete
              placeSelect={onPlaceSelectEnd}
              suggestionsChange={onSuggectionChange}
            />
          </div>
        </GeoapifyContext>
      </div>

      <div className="route-settings-container">
        <h2>Route Settings:</h2>
        <label>
          Unterkünfte:
          <input type="checkbox"
                 checked={settings.isHotelsChecked}
                 onChange={handleSettingsChange}
                 name="isHotelsChecked"
          />
        </label>
        <label>
          Kilometer von Unterkunft zu Unterkunft
          <input type="number"
                 min={50}
                 disabled={!settings.isHotelsChecked}
                 onChange={handleSettingsChange}
                 name="hotelThresholdKM"
                 placeholder="300"
          />
        </label>
        <label>
          Tankstellen:
          <label className="switch">
            <input type="checkbox"
                   checked={settings.isFuelChecked}
                   onChange={handleSettingsChange}
                   name="isFuelChecked"
            />
            <span className="slider"></span>
          </label>
        </label>
        <label>
          Durchschnittliche Tankreichweite
          <input type="number"
                 min={50}
                 disabled={!settings.isFuelChecked}
                 onChange={handleSettingsChange}
                 name="fuelThresholdKM"
                 placeholder="300"
          />
        </label>
        <button type="submit" onClick={handleRouteSettingsSubmit}>Anwenden</button>
      </div>
    </>
  );
};

export default App;
