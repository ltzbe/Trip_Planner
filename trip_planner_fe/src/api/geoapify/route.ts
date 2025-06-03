// for routing
import maplibregl from "maplibre-gl";
import { InputAutocomplete } from "../../types/inputComplete.ts";
import { RouteDetails } from "../../types/routeDetails.ts";
import {getPlacesByCoords} from "./places.ts";
import {DEFAULT_FUEL_THRESHOLD_KM, DEFAULT_HOTEL_THRESHOLD_KM} from "../../config/constants.ts"
import {Settings} from "../../types/settings.ts";
import {createFuelMarker, createHotelMarker} from "./markers.ts";

const GEO_API_KEY = import .meta.env.VITE_GEO_API_KEY_3

let markers: maplibregl.Marker[] = []

const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
};


function displayMarker(map: maplibregl.Map, input: InputAutocomplete) {
    const text = input.properties.address_line1 + " " + input.properties.address_line2

    if (map && input.properties.lat && input.properties.lon) {
        const marker = new maplibregl.Marker({color: "red"})
            .setLngLat([input.properties.lon, input.properties.lat])
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

export const handleGetRoute = async (map: maplibregl.Map, startInput: InputAutocomplete, endInput: InputAutocomplete, routeSettings: Settings) => {
    const {isHotelsChecked, hotelThresholdKM, isFuelChecked, fuelThresholdKM} = routeSettings

    const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${startInput.properties.lat},${startInput.properties.lon}|${endInput.properties.lat},${endInput.properties.lon}&mode=drive&apiKey=${GEO_API_KEY}`, {
        method: "GET",
    })
    if (response.ok) {
        const data = await response.json()
        const multiline = data.features[0].geometry.coordinates
        const coords: [number, number][] = multiline.flat()


        clearMarkers()
        displayRoute(map, data, startInput, endInput);

        if(isFuelChecked){
            const threshold = fuelThresholdKM == null ? DEFAULT_FUEL_THRESHOLD_KM : fuelThresholdKM
            const fuelWaypoints = getWaypoints(coords, 10, threshold)
            displayFuelMarkers(map, fuelWaypoints)
        }

        if(isHotelsChecked){
            const threshold = hotelThresholdKM == null ? DEFAULT_HOTEL_THRESHOLD_KM : hotelThresholdKM
            const hotelWaypoints = getWaypoints(coords, 10, threshold)
            displayHotelMarkers(map, hotelWaypoints)
        }

        return data
    }
}

export const submitRoute = async (routeDetails: RouteDetails, routeName: string): Promise<"success" | "unauthenticated" | "error"> => {
    const token = getTokenFromCookie();
    if (!token) {
        return "unauthenticated";
    }

    const body: { name: string; route: string } = {
        name: routeName,
        route: JSON.stringify(routeDetails)
    };

    try {
        const response = await fetch("http://localhost:8080/routes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return "error";
        }

        return "success";
    } catch {
        return "error";
    }
};

export const loadRouteNames = async () => {
    const token = getTokenFromCookie();
    if (!token) {
        return "unauthenticated";
    }

    try {
        const response = await fetch("http://localhost:8080/routes/id", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return "error";
        }

        return data;
    } catch {
        return "error";
    }
};

function getWaypoints(coords: [number, number][], n: number, threshold: number){
    const waypoints = [];
    let accDistance = 0;

    for (let i = 0; i < coords.length - n; i += n){
        const point1 = coords[i]
        const point2 = coords[i+n]

        const distance = haversineDistance(point1, point2)
        accDistance += distance

        if (accDistance >= threshold){
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
            const marker = new maplibregl.Marker({ element: createFuelMarker() })
              .setLngLat([lon, lat])
              .setPopup(new maplibregl.Popup().setText(
                text
              )).addTo(map);
            markers.push(marker);
        }
    })
}

function displayHotelMarkers(map: maplibregl.Map, waypoints: [number,number][]){
    waypoints.map(async (waypoint) => {
        const data = await getPlacesByCoords(waypoint, "house", 5)

        for (let i = 0; i < data.features.length; i++){
            const lon = data.features[i].geometry.coordinates[0]
            const lat = data.features[i].geometry.coordinates[1]
            const text = `${data.features[i].properties.name} (Hotel)`

            if (map && lon && lat) {
                const marker = new maplibregl.Marker({element: createHotelMarker()})
                  .setLngLat([lon, lat])
                  .setPopup(new maplibregl.Popup().setText(
                    text
                  )).addTo(map);
                markers.push(marker);
            }
        }
    })
}