import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";

import React, {useState} from "react";
import {InputAutocomplete} from "../types/inputComplete.ts";
import {getPlaces} from "../api/geoapify/places.ts";
import PlaceCard from "./placeCard.tsx";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_2

const CATEGORY_CONFIG = [
  { key: "sight", label: "Sights", geoapify: "tourism" },
  { key: "food", label: "Restaurants", geoapify: "catering.restaurant,catering.cafe" },
  { key: "house", label: "Accommodations", geoapify: "accommodation" },
];

type Props = {
  setInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>;
};

const PlacesInput = ({setInput}: Props) => {
  const [places, setPlaces] = useState<any[]>([])

  async function onPlaceSelect(value: InputAutocomplete) {
  setInput(value)

  const result = await Promise.all(
    CATEGORY_CONFIG.map(async (category) => {
      const data = await getPlaces(value, category.key);
      return {
        key: category.key,
        label: category.label,
        features: data.features,
      };
    })
  );
    setPlaces(result)
  }

  function onSuggectionChange(value: GeoJSON.Feature) {
    console.log(value);
  }


  return (
    <div className="wrapper">

      <div className="input-container">
        <GeoapifyContext apiKey={GEO_API_KEY}>
          <div className="address-input-wrapper">
            <h2>Start</h2>
            <GeoapifyGeocoderAutocomplete
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggectionChange}
            />
          </div>
        </GeoapifyContext>
      </div>

      {places?.map((categoryBlock) => (
        <div key={categoryBlock.key}>
          <h3 className="category-heading">{categoryBlock.label}</h3>
          <div className="place-cards">
            {categoryBlock.features.map((place, index) => (
              <PlaceCard placeDetails={place}  key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>

  );
};

export default PlacesInput;
