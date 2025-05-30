// for routing
import maplibregl from "maplibre-gl";
import { InputAutocomplete } from "../../types/inputComplete.ts";
import { RouteDetails } from "../../types/routeDetails.ts";

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
        clearMarkers();

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

        displayRoute(map, data, startInput, endInput);

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