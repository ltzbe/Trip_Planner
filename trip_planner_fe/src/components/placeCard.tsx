import {useEffect, useState} from "react";
import "../css/places.css"
import {getPicture} from "../api/wikimedia/placeImage.ts";
import {RouteFeature} from "../types/routeDetails.ts";

const PLACEHOLDER_IMG = "https://picsum.photos/id/237/200/300"
type Props = {
  placeDetails: RouteFeature,
  key: number
}

export default function PlaceCard({placeDetails} : Props){
  const [picture, setPicture] = useState<string>()

  useEffect(() => {
    getPicture(placeDetails.properties.address_line1).then(setPicture)
  }, [placeDetails]);


  if (!placeDetails?.properties?.name){
    console.log("returns null")
    return null;
  }


  return(
    placeDetails.properties.name &&
    <div className="place-card">
        <div className="place-card-image">
            <img
                src={picture}
                alt="place"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                }}
            />
        </div>
        <div className="place-card-info">
            <h3>{placeDetails.properties.name}</h3>
            <p className="place-type">Lorem Ipsum</p>
            <p className="route-info">Lorem Ipsum</p>
        </div>
    </div>
  )
}