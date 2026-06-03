"use client";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../../../mapbox-popup.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface MarkerData {
  lng: number;
  lat: number;
  title?: string;
  pinId: string;
}

interface MapProps {
  markers?: MarkerData[];
  onMarkerClick?: (pinId: string, marker: MarkerData) => void;
  lat?: number;
  lng?: number;
}

function Map({ markers, onMarkerClick, lat, lng }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [lng ?? 88.611, lat ?? 27.325], // M.G Marg, Gangtok
      zoom: 15, // starting zoom
    });

    // Add markers with click handlers if markers are provided
    (markers ?? []).forEach((markerData) => {
      const { lng, lat, pinId, title } = markerData;

      const markerEl = document.createElement("div");
      const markerImg = document.createElement("img");
      markerImg.src =
        pinId === "current-location" ? "/user-marker.svg" : "/trash-pin.png";
      markerImg.alt = title ?? "Map marker";
      markerImg.style.width = "32px";
      markerImg.style.height = "32px";
      markerImg.style.display = "block";
      markerImg.style.transition = "transform 0.2s cubic-bezier(0.4,0,0.2,1)";
      markerImg.style.transformOrigin = "bottom center"; // scale from the pin tip
      markerImg.style.fill = pinId === "current-location" ? "#007AFF" : ""; // blue for current location, orange for trash bins
      markerEl.appendChild(markerImg);

      const marker = new mapboxgl.Marker({
        element: markerEl,
      })
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);

      const el = marker.getElement();
      el.style.cursor = "pointer";

      el.addEventListener("mouseenter", () => {
        markerImg.style.transform = "scale(1.2)";
      });
      el.addEventListener("mouseleave", () => {
        markerImg.style.transform = "scale(1)";
      });

      // add popover
      const popup = new mapboxgl.Popup({
        className: "popup-title popup-subtitle",
        closeButton: false,
        offset: [0, -30],
      }).setHTML(`
      <div>
        <p class="popup-title">${title}</p>
        <p class="popup-subtitle">${lat.toFixed(3)}, ${lng.toFixed(3)}</p>
      </div>`);

      el.addEventListener("mouseenter", () => popup.addTo(mapRef.current!));
      el.addEventListener("mouseleave", () => popup.remove());
      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(pinId, markerData);
        }
        console.log(`Marker clicked: ${pinId} at [${lng}, ${lat}]`);
        // Show popup on click
        popup.addTo(mapRef.current!);
      });
      marker.setPopup(popup);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [markers, lat, lng]);

  return (
    <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
  );
}

export default Map;
