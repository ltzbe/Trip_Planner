import "../css/routeDetails.css"

const Details = ({routeDetails}) => {

    return(
        routeDetails &&
        <div className="route-details-container">
            <h2>Your Route</h2>
            {/*<p>From {startInput.properties.address_line1}</p>*/}
            {/*<p>To: {endInput.properties.address_line1}</p>*/}
            <p>Distance: {(routeDetails.features[0].properties.distance / 1000).toFixed(2)} km</p>
            <p>Estimated Time: {(routeDetails.features[0].properties.time / 3600).toFixed(1)} h</p>
        </div>
    )
}

export default Details