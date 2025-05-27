const Details = ({startInput, endInput, routeDetails}) => {

    return(
        <div>
            <h2>Your Route</h2>
            <p>From {startInput.properties.address_line1}</p>
            <p>To: {endInput.properties.address_line1}</p>
            <p>Distance: {routeDetails.properties.distance / 1000} km</p>
            <p>Estimated Time: {routeDetails.properties.time / 360} h</p>
        </div>
    )
}

export default Details