import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
import {useState} from "react";
import {handleGetRoute} from "../api/geoapify/route.ts";
import {useMap} from "../api/geoapify/mapContext.tsx";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1

const App = () => {
  const {map} = useMap()
  const [startInput, setStartInput] = useState();
  const [endInput, setEndInput] = useState();

  function onPlaceSelectStart(value: any) {
    setStartInput(value)
    if(endInput && map && value){
      handleGetRoute(map, value, endInput); //value since setStartInput is async and doesnt have value yet
    }
  }

  function onPlaceSelectEnd(value: any){
    setEndInput(value)
    if(startInput && map && value){
      handleGetRoute(map, startInput, value)}
  }

  function onSuggectionChange(value: GeoJSON.Feature) {
    console.log(value);
  }

  return (
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
  );
};

export default App;
