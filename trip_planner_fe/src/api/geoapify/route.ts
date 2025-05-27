// for routing
import maplibregl from "maplibre-gl";

const ROUTING_API_KEY = "7263a7cafcc4410db5377fda5a87d544"

let markers: maplibregl.Marker[] = []

function displayMarker(map: maplibregl.Map, waypoint: [number, number], text: string) {
    if (map) {
        const marker = new maplibregl.Marker().setLngLat([waypoint[1], waypoint[0]])
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

function displayRoute(map: maplibregl.Map, data: { features: any[]; }, start, end, startInput, endInput) {
    if (map) {
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

        displayMarker(map, start, startInput.properties.address_line1 + " " + startInput.properties.address_line2)
        displayMarker(map, end, endInput.properties.address_line1 + " " + endInput.properties.address_line2)
    }
}

export const handleGetRoute = async (map: maplibregl.Map, startInput, endInput)=> {
    const start: [number, number] = [
        startInput.properties.lat,
        startInput.properties.lon
    ];

    const end: [number, number] = [
        endInput.properties.lat,
        endInput.properties.lon
    ];

    const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${start[0]},${start[1]}|${end[0]},${end[1]}&mode=drive&apiKey=${ROUTING_API_KEY}`, {
        method: "GET",
    })
    if (response.ok) {
        const data = await response.json()

        displayRoute(map, data, start, end, startInput, endInput);

    }
}
