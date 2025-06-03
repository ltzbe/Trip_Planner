import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "../css/addressInput.css";
import "../css/loader.css";

import React, { useState } from "react";
import { InputAutocomplete } from "../types/inputComplete.ts";
import { getPlaces } from "../api/geoapify/places.ts";
import PlaceCard from "./placeCard.tsx";
import { RouteFeature } from "../types/routeDetails.ts";
import SpinnerLoader from "./spinnerLoader.tsx";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_2;

const CATEGORY_CONFIG = [
  { key: "sight", label: "Sights", geoapify: "tourism" },
  {
    key: "food",
    label: "Restaurants",
    geoapify: "catering.restaurant,catering.cafe",
  },
  { key: "house", label: "Accommodations", geoapify: "accommodation" },
];

type Props = {
  setInput: React.Dispatch<React.SetStateAction<InputAutocomplete | null>>;
  input: InputAutocomplete | null;
};

const PlacesInput = ({ setInput, input }: Props) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onPlaceSelect(value: InputAutocomplete) {
    setInput(value);
    setLoading(true);
    const result = await Promise.all(
      CATEGORY_CONFIG.map(async (category) => {
        const data = await getPlaces(value, category.key);
        console.log(data.features);
        return {
          key: category.key,
          label: category.label,
          features: data.features,
        };
      })
    );
    setPlaces(result);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="place-loader">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="input-container">
        <GeoapifyContext apiKey={GEO_API_KEY}>
          <div className="address-input-wrapper">
            <GeoapifyGeocoderAutocomplete placeSelect={onPlaceSelect} />
          </div>
        </GeoapifyContext>
      </div>

      {input && (
        <h2 className="category-heading">
          Vorschläge für {input.properties.address_line1}
        </h2>
      )}

      {places?.map((categoryBlock) => (
        <div key={categoryBlock.key}>
          <h3 className="category-heading">{categoryBlock.label}</h3>
          <div className="place-cards">
            {categoryBlock.features.map(
              (place: RouteFeature, index: number) => (
                <PlaceCard placeDetails={place} key={index} />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesInput;
