"use client";
import { ChevronDown } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
  onAddNewMarkerClick?: (lat: number, lng: number) => void;
  lat?: number;
  lng?: number;
}

const legends = [
  { label: "Current Location", color: "#007AFF", icon: "/user-marker.svg" },
  { label: "Trash Bin", color: "#FF9500", icon: "/trash-pin.png" },
];

const CLICKED_MARKER_COORDS_SELECTOR = "[data-clicked-marker-coords]";

function MapPinPlusColored({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#2DA971"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-primary ${className}`}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <path d="M12 7v6" stroke="white" />
      <path d="M9 10h6" stroke="white" />
    </svg>
  );
}

function formatCoords(lat: number, lng: number) {
  return `Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}`;
}

function createClickedMarkerElement({
  lat,
  lng,
  onAddNewMarkerClick,
}: {
  lat: number;
  lng: number;
  onAddNewMarkerClick?: (lat: number, lng: number) => void;
}) {
  const markerEl = document.createElement("div");
  markerEl.className = "flex flex-col items-center gap-1 font-sans";
  markerEl.dataset.clickedMarkerLat = String(lat);
  markerEl.dataset.clickedMarkerLng = String(lng);

  const markerDiv = document.createElement("div");
  markerDiv.className = "flex flex-col rounded-xl bg-white p-4 shadow-md";

  const title = document.createElement("span");
  title.className = "text-md font-bold";
  title.textContent = "Add New Trash Pin";

  const subtitle = document.createElement("span");
  subtitle.className = "text-xs text-gray-500 mb-2";
  subtitle.dataset.clickedMarkerCoords = "true";
  subtitle.textContent = formatCoords(lat, lng);

  const button = document.createElement("button");
  button.className =
    "mt-2 px-3 py-1 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90";
  button.textContent = "Add Pin";
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const markerLat = Number(markerEl.dataset.clickedMarkerLat);
    const markerLng = Number(markerEl.dataset.clickedMarkerLng);
    onAddNewMarkerClick?.(markerLat, markerLng);
  });

  markerDiv.appendChild(title);
  markerDiv.appendChild(subtitle);
  markerDiv.appendChild(button);

  const iconWrapper = document.createElement("div");
  iconWrapper.className =
    "flex size-10 items-center justify-center rounded-full text-primary-foreground";
  iconWrapper.innerHTML = renderToStaticMarkup(
    <MapPinPlusColored className="size-8" />,
  );

  markerEl.appendChild(markerDiv);
  markerEl.appendChild(iconWrapper);
  markerEl.addEventListener("click", (event) => event.stopPropagation());

  return markerEl;
}

function updateClickedMarkerElementCoords(
  markerEl: HTMLElement,
  lat: number,
  lng: number,
) {
  markerEl.dataset.clickedMarkerLat = String(lat);
  markerEl.dataset.clickedMarkerLng = String(lng);

  const subtitle = markerEl.querySelector(CLICKED_MARKER_COORDS_SELECTOR);
  if (subtitle) {
    subtitle.textContent = formatCoords(lat, lng);
  }
}

function createMapMarkerElement(markerData: MarkerData) {
  const { pinId, title } = markerData;
  const markerEl = document.createElement("div");
  const markerImg = document.createElement("img");

  markerImg.src =
    pinId === "current-location" ? "/user-marker.svg" : "/trash-pin.png";
  markerImg.alt = title ?? "Map marker";
  markerImg.style.width = "32px";
  markerImg.style.height = "32px";
  markerImg.style.display = "block";
  markerImg.style.transition = "transform 0.2s cubic-bezier(0.4,0,0.2,1)";
  markerImg.style.transformOrigin = "bottom center";
  markerImg.style.fill = pinId === "current-location" ? "#007AFF" : "";

  markerEl.appendChild(markerImg);

  return { markerEl, markerImg };
}

function createMarkerPopup({ title, lat, lng }: MarkerData) {
  return new mapboxgl.Popup({
    className: "popup-title popup-subtitle",
    closeButton: false,
    offset: [0, -30],
  }).setHTML(`
    <div>
      <p class="popup-title">${title}</p>
      <p class="popup-subtitle">${lat.toFixed(3)}, ${lng.toFixed(3)}</p>
    </div>`);
}

function Map({
  markers,
  onMarkerClick,
  onAddNewMarkerClick,
  lat,
  lng,
}: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const clickedMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [lng ?? 88.611, lat ?? 27.325], // M.G Marg, Gangtok
      zoom: 17, // starting zoom
    });

    mapRef.current.on("click", (event) => {
      const { lng, lat } = event.lngLat;

      if (clickedMarkerRef.current) {
        clickedMarkerRef.current.setLngLat([lng, lat]);
        updateClickedMarkerElementCoords(
          clickedMarkerRef.current.getElement(),
          lat,
          lng,
        );
      } else {
        const markerEl = createClickedMarkerElement({
          lat,
          lng,
          onAddNewMarkerClick,
        });

        clickedMarkerRef.current = new mapboxgl.Marker({
          element: markerEl,
          offset: [0, -70],
        })
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
      }
    });

    // Add markers with click handlers if markers are provided
    (markers ?? []).forEach((markerData) => {
      const { lng, lat, pinId } = markerData;
      const { markerEl, markerImg } = createMapMarkerElement(markerData);

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

      const popup = createMarkerPopup(markerData);

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
      clickedMarkerRef.current?.remove();
      clickedMarkerRef.current = null;
      mapRef.current?.remove();
    };
  }, [markers, onAddNewMarkerClick, onMarkerClick, lat, lng]);

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
