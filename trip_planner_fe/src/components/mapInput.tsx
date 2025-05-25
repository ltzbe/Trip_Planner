import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";

const App = () => {
  function onPlaceSelect(value: any) {
    console.log(value);
  }

  function onSuggectionChange(value: any) {
    console.log(value);
  }

  return (
    <GeoapifyContext apiKey="7263a7cafcc4410db5377fda5a87d544">
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
