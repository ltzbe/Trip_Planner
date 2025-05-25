import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/map.css';
import {useMap} from "../api/geoapify/mapContext.tsx";

type MapProps = {
  center?: [number, number];
  zoom?: number;
};

export default function Map({ center = [11.5761, 48.1374], zoom = 10 }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const {setMap} = useMap();

  useEffect(() => {
    if (!mapContainer.current) return;


    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=fd01fe88a9bc4790ae18c75ebe561c99',
      center,
      zoom,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainer} className="map-container"/>
  );
}