import {RouteFeature} from "../types/routeDetails.ts";


interface HotelCardProps {
  feature: RouteFeature;
  key?: number; // key is optional here because React will handle it separately
}

export const HotelCard: React.FC<HotelCardProps> = ({ feature }) => {

  return (
    <div className="hotel-card" >
      <h4>{feature.properties.name}</h4>
      <p>{feature.properties.address_line2}</p>
      <p className="feature.properties-distance">📍 {(feature.properties.distance / 1000).toFixed(1)} km von Route</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(feature.properties.name + ' ' + feature.properties.address_line2)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Bewertungen auf GoogleMaps
      </a>
    </div>
  )
};
