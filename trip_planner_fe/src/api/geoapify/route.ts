// for routing
import maplibregl from "maplibre-gl";
import { InputAutocomplete } from "../../types/inputComplete.ts";
import { RouteDetails } from "../../types/routeDetails.ts";
import {getPlaces, getPlacesByCoords} from "./places.ts";

const ROUTING_API_KEY = "7263a7cafcc4410db5377fda5a87d544"

let markers: maplibregl.Marker[] = []

const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
};


function displayMarker(map: maplibregl.Map, input: InputAutocomplete) {
    const text = input.properties.address_line1 + " " + input.properties.address_line2
    if (map && input.properties.lat && input.properties.lon) {
        const marker = new maplibregl.Marker().setLngLat([input.properties.lon, input.properties.lat])
            .setPopup(new maplibregl.Popup().setText(
                text
            )).addTo(map);
        markers.push(marker);
    }
}

function clearMarkers() {
    markers.forEach(marker => marker.remove());
    markers = [];
}

function displayRoute(map: maplibregl.Map,
    data: RouteDetails,
    startInput: InputAutocomplete,
    endInput: InputAutocomplete) {

    if (map && data && data.features[0]) {
        if (map.getLayer("route-layer")) {
            map.removeLayer("route-layer")
            map.removeSource("route-layer")
        }

        map.addSource('route-layer', {
            type: 'geojson',
            data: data.features[0]
        });

        map.addLayer({
            'id': 'route-layer',
            'type': 'line',
            'source': 'route-layer',
            'layout': {
                'line-cap': "round",
                'line-join': "round"
            },
            'paint': {
                'line-color': "#6084eb",
                'line-width': 8
            },
            'filter': ['==', '$type', 'LineString']
        });

        displayMarker(map, startInput)
        displayMarker(map, endInput)
    }
}

export const handleGetRoute = async (map: maplibregl.Map, startInput: InputAutocomplete, endInput: InputAutocomplete) => {

    const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${startInput.properties.lat},${startInput.properties.lon}|${endInput.properties.lat},${endInput.properties.lon}&mode=drive&apiKey=${ROUTING_API_KEY}`, {
        method: "GET",
    })
    if (response.ok) {
        const data = await response.json()
        const multiline = data.features[0].geometry.coordinates
        const coords: [number, number][] = multiline.flat()

        const fuelWaypoints = getWaypoints(coords, 10, 300)

        clearMarkers()
        displayRoute(map, data, startInput, endInput);
        displayFuelMarkers(map, fuelWaypoints)

        return data
    }
}

export const submitRoute = async (routeDetails: RouteDetails) => {

    const token = getTokenFromCookie();
    if (!token) {
        throw new Error("User is not authenticated");
    } else {
        const response = await fetch("http://localhost:8080/route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(routeDetails)
        });

        if (!response.ok) {
            throw new Error("Failed to submit route");
        }
        return await response.json();
    }
}

function getWaypoints(coords: [number, number][], n: number, threshold: number){
    console.log("called")
    const waypoints = [];
    let accDistance = 0;

    for (let i = 0; i < coords.length - n; i += n){
        const point1 = coords[i]
        const point2 = coords[i+n]

        const distance = haversineDistance(point1, point2)
        accDistance += distance
        console.log(accDistance)

        if (accDistance >= threshold){
            console.log(point2 + "hier")
            waypoints.push(point2)
            accDistance = 0;
        }
    }
    return waypoints
}

function haversineDistance(start: [number, number], end: [number, number]) {
    const [lon1, lat1] = start
    const [lon2, lat2] = end

    const toRad = (angle: number) => (angle * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function displayFuelMarkers(map: maplibregl.Map, waypoints:[number,number][]){
    waypoints.map(async (waypoint)=>{
        const data = await getPlacesByCoords(waypoint, "fuel", 1)
        const lon = data.features[0].geometry.coordinates[0]
        const lat = data.features[0].geometry.coordinates[1]
        const text = `${data.features[0].properties.name} (Tankstelle)`

        if (map && lon && lat) {
            const marker = new maplibregl.Marker().setLngLat([lon, lat])
              .setPopup(new maplibregl.Popup().setText(
                text
              )).addTo(map);
            markers.push(marker);
        }
    })

}