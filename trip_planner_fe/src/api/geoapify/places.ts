import {InputAutocomplete} from "../../types/inputComplete.ts";

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_2
const URL = "https://api.geoapify.com/v2/places?"

export const getPlaces = async (input: InputAutocomplete, category: string) => {
  const categoriesFilter =
    category == "food" ? "catering.restaurant,catering.cafe" :
    category == "sight" ? "tourism" :
    category == "house" ? "accommodation.hotel,accommodation.apartment" :
    category == "fuel" ? "service.vehicle.fuel" :
    "activity"
  const placeFilter = input.properties.lon + "," + input.properties.lat + "," + "5000";

  const response = await fetch(`${URL}categories=${categoriesFilter}&filter=circle:${placeFilter}&limit=5&apiKey=${GEO_API_KEY}`)

  if(response.ok){
    return await response.json()
  }
}

export const getPlacesByCoords = async (coords: [number, number], category: string, limit: number)=> {
  const categoriesFilter =
    category == "food" ? "catering.restaurant,catering.cafe" :
    category == "sight" ? "tourism" :
    category == "house" ? "accommodation.hotel,accommodation.apartment" :
    category == "fuel" ? "service.vehicle.fuel" :
    "activity"

  const biasFilter = coords[0] + "," + coords[1]
  const placeFilter = coords[0] + "," + coords[1] + "," + "50000";

  const response = await fetch(`${URL}categories=${categoriesFilter}&filter=circle:${placeFilter}&bias=proximity:${biasFilter}&limit=${limit}&apiKey=${GEO_API_KEY}`)

  if(response.ok){
    return await response.json()
  }

}