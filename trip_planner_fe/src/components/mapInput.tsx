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

const App = ({setRouteDetails}) => {
  const {map} = useMap()
  const [startInput, setStartInput] = useState();
  const [endInput, setEndInput] = useState();

  async function onPlaceSelectStart(value: any) {
    if(map){
      map.jumpTo({center: [value.properties.lon, value.properties.lat], zoom: 10})
      setStartInput(value)
      if(endInput && value){
        setRouteDetails( await handleGetRoute(map, value, endInput)); //value since setStartInput is async and doesnt have value yet
      }
    }
  }

  async function onPlaceSelectEnd(value: any){
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
