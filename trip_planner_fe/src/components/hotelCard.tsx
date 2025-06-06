import {RouteFeature} from "../types/routeDetails.ts";


interface HotelCardProps {
  feature: RouteFeature;
  key?: number; // key is optional here because React will handle it separately
}

export const HotelCard: React.FC<HotelCardProps> = ({ feature }) => {

  return (
    <div className="hotel-card">
      <h3>{feature.properties.name}</h3>
      <p>{feature.properties.address_line1}</p>
    </div>
  )
};

// export default function HotelCard (hotelDetail: RouteFeature){
//   return (
//     <div className="hotel-card">
//       <h3>{hotelDetail.properties.name}</h3>
//       <p>{hotelDetail.properties.address_line1}</p>
//     </div>
//   )
// }