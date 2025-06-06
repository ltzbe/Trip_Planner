import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../../css/dashboard/map.css";
import { useMap } from "../../context/map/mapContext.tsx";
const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY_1;

type MapProps = {
  center?: [number, number];
  zoom?: number;
};

export default function Map({
  center = [11.5761, 48.1374],
  zoom = 10,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { setMap } = useMap();

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${GEO_API_KEY}`,
      center,
      zoom,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
