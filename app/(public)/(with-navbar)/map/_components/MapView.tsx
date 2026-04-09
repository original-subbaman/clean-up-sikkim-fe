"use client";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface MarkerData {
  lng: number;
  lat: number;
  pinId: string;
}

interface MapProps {
  markers?: MarkerData[];
  onMarkerClick?: (pinId: string, marker: MarkerData) => void;
}

function Map({ markers, onMarkerClick }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [88.611, 27.325], // M.G Marg, Gangtok
      zoom: 15, // starting zoom
    });

    // Add markers with click handlers if markers are provided
    (markers ?? []).forEach((markerData) => {
      const { lng, lat, pinId } = markerData;
      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);
      const el = marker.getElement();
      el.style.cursor = "pointer";

      const svg = el.querySelector("svg");
      if (svg) {
        svg.style.transition = "transform 0.2s cubic-bezier(0.4,0,0.2,1)";
        svg.style.transformOrigin = "bottom center"; // scale from the pin tip
        el.addEventListener("mouseenter", () => {
          svg.style.transform = "scale(1.2)";
        });
        el.addEventListener("mouseleave", () => {
          svg.style.transform = "scale(1)";
        });
      }

      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(pinId, markerData);
        }
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [markers]);

  return (
    <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
  );
}

export default Map;
