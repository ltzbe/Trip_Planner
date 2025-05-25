import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import '../css/map.css';

type MapProps = {
  center?: [number, number];
  zoom?: number;
};

export default function Map({ center = [11.5761, 48.1374], zoom = 10 }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=fd01fe88a9bc4790ae18c75ebe561c99',
      center,
      zoom,
    });

    return () => {
      map.remove();
    };
  }, [center, zoom]);

  return (
    <div ref={mapContainer} className="map-container"/>
  );
}