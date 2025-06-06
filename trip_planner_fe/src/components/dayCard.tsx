import {RouteFeature} from "../types/routeDetails.ts";
import {HotelCard} from "./hotelCard.tsx";

type Props = {
  hotels: RouteFeature[],
  index: number
}

export default function DayCard({hotels, index}: Props){
  console.log(hotels, "hotels wird gecalled")

  return(
    <div className="daycard">
      <h2>Tag {index}</h2>
      <div className="daycard-content">
        {hotels.map((hotelDetail: RouteFeature, index: number) => (
          <HotelCard feature={hotelDetail}  key={index} />
        ))}
      </div>
    </div>
  )
}
