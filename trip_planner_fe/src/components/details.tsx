import "../css/routeDetails.css"
import {RouteDetails} from "../types/routeDetails.ts";
import {InputAutocomplete} from "../types/inputComplete.ts";

type Props = {
    routeDetails: RouteDetails;
    startInput: InputAutocomplete;
    endInput: InputAutocomplete
}

const Details = ({routeDetails, startInput, endInput}: Props) => {

    return(
        routeDetails &&
        <div className="route-details-container">
            <h2>Your Route</h2>
            <div className="details-content">
                <p>From: {startInput.properties.address_line1}</p>
                <p>To: {endInput.properties.address_line1}</p>
                <p>Distance: {(routeDetails.features[0].properties.distance / 1000).toFixed(2)} km</p>
                <p>Estimated Time: {(routeDetails.features[0].properties.time / 3600).toFixed(1)} h</p>
            </div>
        </div>
    )
}

export default Details