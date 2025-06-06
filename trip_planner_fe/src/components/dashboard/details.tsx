import "../../css/dashboard/routeDetails.css";
import {RouteFeature} from "../../types/routeDetails.ts";

type Props = {
  route: RouteFeature | null;
  startName: string | null;
  endName: string | null;
};

const Details = ({ route, startName, endName }: Props) => {
  return (
    route &&
    startName &&
    endName && (
      <div className="route-details-container">
        <h2>Deine Route</h2>
        <div className="details-content">
          <p>
            <span className="details-content-title">Start:</span>{" "}
            {startName}
          </p>
          <p>
            <span className="details-content-title">Ende: </span>
            {endName}
          </p>
          <p>
            <span className="details-content-title">Länge der Strecke:</span>{" "}
            {(route.properties.distance / 1000).toFixed(2)}{" "}
            km
          </p>
          <p>
            <span className="details-content-title">Erwartete Fahrtdauer:</span>{" "}
            {(route.properties.time / 3600).toFixed(1)} h
          </p>
        </div>
      </div>
    )
  );
};

export default Details;
