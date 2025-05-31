import {InputAutocomplete} from "../../types/inputComplete.ts";

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_2
const URL = "https://api.geoapify.com/v2/places?"

export const getPlaces = async (input: InputAutocomplete, category: string) => {
  const categoriesFilter =
    category == "food" ? "catering.restaurant,catering.cafe" :
    category == "sight" ? "tourism" :
    category == "house" ? "accommodation.hotel,accommodation.apartment" :
    "activity"
  console.log(categoriesFilter, "filter")
  const placeFilter = input.properties.lon + "," + input.properties.lat + "," + "5000";

  const response = await fetch(`${URL}categories=${categoriesFilter}&filter=circle:${placeFilter}&limit=5&apiKey=${GEO_API_KEY}`)

  if(response.ok){
    const data = await response.json()
    console.log(data)
    return data
  }
}