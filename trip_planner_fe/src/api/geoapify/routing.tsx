// for routing
import {useMap} from "./mapContext.tsx";
import maplibregl from "maplibre-gl";
import {useRef} from "react";

const ROUTING_API_KEY = "7263a7cafcc4410db5377fda5a87d544"

const start :[number, number] = [52.5200, 13.4050]

const end:[number, number] = [48.1351, 11.5820]

const Route = () => {
    const {map} = useMap();

    const markersRef = useRef<maplibregl.Marker[]>([]);

    function displayMarker(waypoint :[number, number], text :string) {
        if(map){
            const marker = new maplibregl.Marker().setLngLat([waypoint[1], waypoint[0]])
                .setPopup(new maplibregl.Popup().setText(
                    text
                )).addTo(map);
            markersRef.current.push(marker);
        }
    }

    function clearMarkers(){
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
    }

    function displayRoute(data: { features: any[]; }){
        if(map){
            if(map.getLayer("route-layer")){
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

            displayMarker(start, "Berlin")
            displayMarker(end, "Munich")
        }
    }

    async function handleGetRoute() {
        const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${start[0]},${start[1]}|${end[0]},${end[1]}&mode=drive&apiKey=${ROUTING_API_KEY}`, {
            method: "GET",
        })
        if (response.ok){
            const data = await response.json()
            console.log(data);

            displayRoute(data);

        }
    }

    return(
        <button onClick={handleGetRoute}>
            Calculate Route
        </button>
    )
}

export default Route