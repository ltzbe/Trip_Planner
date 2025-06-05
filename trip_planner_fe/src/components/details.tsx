import "../css/routeDetails.css";
import { RouteDetails } from "../types/routeDetails.ts";
import { InputAutocomplete } from "../types/inputComplete.ts";

type Props = {
  routeDetails: RouteDetails | null;
  startInput: InputAutocomplete | null;
  endInput: InputAutocomplete | null;
};

const Details = ({ routeDetails, startInput, endInput }: Props) => {
  return (
    routeDetails &&
    startInput &&
    endInput && (
      <div className="route-details-container">
        <h2>Deine Route</h2>
        <div className="details-content">
          <p>
            <span className="details-content-title">Start:</span>{" "}
            {startInput.properties.address_line1}
          </p>
          <p>
            <span className="details-content-title">Ende: </span>
            {endInput.properties.address_line1}
          </p>
          <p>
            <span className="details-content-title">Länge der Strecke:</span>{" "}
            {(routeDetails.features[0].properties.distance / 1000).toFixed(2)}{" "}
            km
          </p>
          <p>
            <span className="details-content-title">Erwartete Fahrtdauer:</span>{" "}
            {(routeDetails.features[0].properties.time / 3600).toFixed(1)} h
          </p>
        </div>
      </div>
    )
  );
};

export default Details;
