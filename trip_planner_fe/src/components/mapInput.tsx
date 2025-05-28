import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
import {handleGetRoute} from "../api/geoapify/route.ts";
import {useMap} from "../api/geoapify/mapContext.tsx";
import {RouteDetails} from "../types/routeDetails.ts";
import React from "react";
import {InputAutocomplete} from "../types/inputComplete.ts";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1

type Props = {
  setRouteDetails: React.Dispatch<React.SetStateAction<RouteDetails | null>>;
  startInput: InputAutocomplete | null;
  setStartInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>;
  endInput: InputAutocomplete | null;
  setEndInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>
};

const App = ({setRouteDetails, startInput, setStartInput, endInput, setEndInput} : Props) => {
  const {map} = useMap()

  async function onPlaceSelectStart(value: InputAutocomplete) {
    if(map && value.properties.lon && value.properties.lat){
      map.jumpTo({center: [value.properties.lon, value.properties.lat], zoom: 10})
      setStartInput(value)
      if(endInput && value){
        setRouteDetails( await handleGetRoute(map, value, endInput)); //value since setStartInput is async and doesnt have value yet
      }
    }
  }

  async function onPlaceSelectEnd(value: InputAutocomplete){
    setEndInput(value)
    if(startInput && map && value){
      setRouteDetails(await handleGetRoute(map, startInput, value))}
  }

  function onSuggectionChange(value: GeoJSON.Feature) {
    console.log(value);
  }


  return (
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
  );
};

export default App;
