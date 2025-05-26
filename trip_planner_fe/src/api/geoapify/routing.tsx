// for routing
import {useMap} from "./mapContext.tsx";

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_3

const start = {
    lat: 52.5200,
    lon: 13.4050
}

const end = {
    lat: 48.1351,
    lon: 11.5820,
}

const Route = () => {
    const {map} = useMap();

    function displayRoute(data: { features: any[]; }){
        if(map){
            if(map.getLayer("route-layer")){
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
        }
    }

    async function handleGetRoute() {
        const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${start.lat},${start.lon}|${end.lat},${end.lon}&mode=drive&apiKey=${GEO_API_KEY}`, {
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