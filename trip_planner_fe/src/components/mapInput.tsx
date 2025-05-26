import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1

const App = () => {
  function onPlaceSelect(value: GeoJSON.Feature) {
    console.log(value);
  }

  function onSuggectionChange(value: GeoJSON.Feature) {
    console.log(value);
  }

  return (
    <GeoapifyContext apiKey={GEO_API_KEY}>
      <div className="address-input-wrapper">
        <h2>Start</h2>
        <GeoapifyGeocoderAutocomplete
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
      </div>

      <div className="address-input-wrapper">
        <h2>Ziel</h2>
        <GeoapifyGeocoderAutocomplete
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
      </div>
    </GeoapifyContext>
  );
};

export default App;
