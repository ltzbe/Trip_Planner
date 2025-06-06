import {RouteFeature} from "../types/routeDetails.ts";
import {HotelCard} from "./hotelCard.tsx";
import "../css/daycards.css"
import {useState} from "react";
import {WeatherViewer} from "./weatherViewer.tsx";

type Props = {
  hotels: RouteFeature[],
  index: number
}

export default function DayCard({hotels, index}: Props){
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return(
    <div className="daycard">
      <h2 onClick={() => setIsOpen(!isOpen)} className="collapsible-toggle">
        Tag {index + 1} {isOpen ? '▲' : '▼'}
      </h2>
      <WeatherViewer cityName={hotels[0].properties.city_name}
                     stateCode={hotels[0].properties.state_code}
                     countryCode={hotels[0].properties.country_code}/>

      <div className="daycard-content">

        {isOpen && (
          <>
            <h3>Vorgeschlagene Hotels:</h3>

            <div className="hotel-list">
              {hotels.map((hotelDetail: RouteFeature, i: number) => (
                <HotelCard feature={hotelDetail}  key={i+1} />
              ))}
            </div>
          </>
          )
        }

      </div>
    </div>
  )
}
