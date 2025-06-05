// for routing
import maplibregl from "maplibre-gl";
import { RouteFeature } from "../../types/routeDetails.ts";

export interface storedRouteDetails {
    id: number;
    name: string;
    startPoint: string;
    endPoint: string;
    route: string;
    userID: {
        id: number;
        username: string;
        email: string;
        password: string;
    };
}

let markers: maplibregl.Marker[] = [];

const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
};

function clearMarkers() {
    markers.forEach(marker => marker.remove());
    markers = [];
}

export const getRouteByName = async (routeName: string, map: maplibregl.Map) => {
    const token = getTokenFromCookie();
    if (!token) {
        return "unauthenticated";
    }

    try {
        const response = await fetch(`http://localhost:8080/routes/name?routeName=${encodeURIComponent(routeName)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            return "error";
        }

        displayStoredRoute(map, data)
        return "success";
    } catch {
        return "error";
    }
}

function displayStoredRoute(map: maplibregl.Map, data: storedRouteDetails) {
    try {
        const parsedRoute = JSON.parse(data.route);

        if (map && parsedRoute) {
            if (map.getLayer("route-layer")) {
                map.removeLayer("route-layer")
                map.removeSource("route-layer")
            }

            map.addSource('route-layer', {
                type: 'geojson',
                data: parsedRoute
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
        loadWaypointsStoredRoute(parsedRoute, map, data.startPoint, data.endPoint);
    }
    catch {
        return "error";
    }
}

function loadWaypointsStoredRoute(parsedRoute: RouteFeature, map: maplibregl.Map, startPoint: string, endPoint: string) {
    const waypoints = parsedRoute.properties.waypoints;
    displayWaypointsStoredRoute(waypoints, map, startPoint, endPoint);
}

function displayWaypointsStoredRoute(waypoints:  {location:[number, number] }[], map: maplibregl.Map, startPoint: string, endPoint: string) {
    clearMarkers();

    if (map && waypoints[0].location[0] && waypoints[0].location[1]) {
        const marker = new maplibregl.Marker({ color: "red" })
            .setLngLat([waypoints[0].location[0], waypoints[0].location[1]])
            .setPopup(new maplibregl.Popup().setText(
                startPoint
            )).addTo(map);
        markers.push(marker);
        map.jumpTo({
            center: [waypoints[0].location[0], waypoints[0].location[1]],
            zoom: 7,
        })
    }

    const lastWaypoint = waypoints[waypoints.length - 1];

    if (map && lastWaypoint.location[0] && lastWaypoint.location[1]) {
        const marker = new maplibregl.Marker({ color: "red" })
            .setLngLat([lastWaypoint.location[0], lastWaypoint.location[1]])
            .setPopup(new maplibregl.Popup().setText(
                endPoint
            )).addTo(map);
        markers.push(marker);

    }

}

export const deleteRoute = async (routeName: string) => {
    const token = getTokenFromCookie();
    if (!token) {
        return "unauthenticated";
    }

    try {

        const response = await fetch(`http://localhost:8080/routes/name?routeName=${encodeURIComponent(routeName)}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok){
            return "success"
        }
    }
    catch (e) {
        console.log(e)
        return "error"
    }
}
