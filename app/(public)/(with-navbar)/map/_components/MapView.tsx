"use client";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
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

const legends = [
  { label: "Current Location", color: "#007AFF", icon: "/user-marker.svg" },
  { label: "Trash Bin", color: "#FF9500", icon: "/trash-pin.png" },
];

function Map({ markers, onMarkerClick, lat, lng }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [lng ?? 88.611, lat ?? 27.325], // M.G Marg, Gangtok
      zoom: 17, // starting zoom
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
    <div className="relative w-full h-full">
      <MapLegends legends={legends} />
      <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
    </div>
  );
}

interface MapLegendsProps {
  legends: { label: string; color: string; icon: string }[];
}

function MapLegends({ legends }: MapLegendsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute right-3 top-3 z-10 rounded bg-white p-3 shadow-lg sm:right-5 sm:top-5 sm:w-2xs sm:p-4">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="map-legends-list"
        className="flex w-full items-center justify-between gap-3 sm:hidden"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <span className="text-sm font-bold">LEGENDS</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <h6 className="hidden text-sm font-bold sm:block">LEGENDS</h6>
      <div
        id="map-legends-list"
        className={`mt-2 flex-col gap-2 sm:flex sm:flex-row sm:items-center sm:gap-4 ${
          isExpanded ? "flex" : "hidden"
        }`}
      >
        {legends.map((legend) => (
          <div key={legend.label} className="flex items-center gap-2">
            <img
              src={legend.icon}
              alt={`${legend.label} icon`}
              className="w-6 h-6"
            />
            <span className="text-xs">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;
