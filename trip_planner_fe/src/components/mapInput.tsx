import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
import {useState} from "react";
import {handleGetRoute} from "../api/geoapify/route.ts";
import {useMap} from "../api/geoapify/mapContext.tsx";

const App = () => {
  const {map} = useMap()
  const [startInput, setStartInput] = useState();
  const [endInput, setEndInput] = useState();

  function onPlaceSelectStart(value: any) {
    setStartInput(value)
    if(endInput && map){
      handleGetRoute(map, value, endInput); //value since setStartInput is async and doesnt have value yet
    }
  }

  function onPlaceSelectEnd(value :any){
    setEndInput(value)
    if(startInput && map){
      handleGetRoute(map, startInput, value)
    }
  }

  function onSuggectionChange(value: any) {
    console.log(value);
  }

  return (
    <GeoapifyContext apiKey="7263a7cafcc4410db5377fda5a87d544">
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
