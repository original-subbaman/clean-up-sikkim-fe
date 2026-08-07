"use client";
import {
  ChevronDown,
  LocateFixed,
  MapIcon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { PinStatus } from "@/models/pins";
import "../../../../mapbox-popup.css";
import { Button } from "@/components/ui/button";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

export interface MarkerData {
  lng: number;
  lat: number;
  title?: string;
  reportedBy?: string;
  reporterName?: string;
  photoUrls?: string[];
  description?: string;
  city?: string;
  state?: string;
  status?: PinStatus;
  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  upvotes?: number;
  pinId: string;
}

interface MapProps {
  markers?: MarkerData[];
  onMarkerClick?: (pinId: string, marker: MarkerData) => void;
  onFlagClick?: ((pinId: string, marker: MarkerData) => void) | null;
  onUpvoteClick?: ((pinId: string, marker: MarkerData) => void) | null;
  onAddNewMarkerClick?: (lat: number, lng: number) => void;
  onMapClick?: () => void;
  lat?: number;
  lng?: number;
}

interface RenderedMarker {
  marker: mapboxgl.Marker;
  popup: mapboxgl.Popup;
  markerImg: HTMLImageElement;
  data: MarkerData;
}

const legends = [
  { label: "Current Location", color: "#007AFF", icon: "/user-marker.svg" },
  { label: "Trash Bin", color: "#FF9500", icon: "/trash-pin.png" },
];

const ADD_NEW_MARKER_COORDS_SELECTOR = "[data-add-new-marker-coords]";

type PopupProps = Pick<
  MarkerData,
  "title" | "lat" | "lng" | "reporterName" | "photoUrls" | "status"
> & {
  onFlagClick?: (() => void) | null;
  onUpvoteClick?: (() => void) | null;
};

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

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

function createAddNewMarkerElement({
  lat,
  lng,
  onAddNewMarkerClick,
  onClose,
}: {
  lat: number;
  lng: number;
  onAddNewMarkerClick?: (lat: number, lng: number) => void;
  onClose: () => void;
}) {
  const markerEl = document.createElement("div");
  markerEl.className = "flex flex-col items-center gap-1 font-sans";
  markerEl.dataset.addNewMarkerLat = String(lat);
  markerEl.dataset.addNewMarkerLng = String(lng);

  const markerDiv = document.createElement("div");
  markerDiv.className = "flex w-48 flex-col rounded-xl bg-white p-4 shadow-md";

  const header = document.createElement("div");
  header.className = "flex items-start justify-between gap-3";

  const title = document.createElement("span");
  title.className = "text-md font-bold";
  title.textContent = "Add New Trash Pin";

  const closeButton = document.createElement("button");
  closeButton.className =
    "-mr-1 -mt-1 flex size-6 items-center justify-center rounded-full text-base leading-none text-gray-400  hover:text-gray-700";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    onClose();
  });

  const subtitle = document.createElement("span");
  subtitle.className = "text-xs text-gray-500 mb-2";
  subtitle.dataset.addNewMarkerCoords = "true";
  subtitle.textContent = formatCoords(lat, lng);

  const addPinButton = document.createElement("button");
  addPinButton.className =
    "mt-2 px-3 py-1 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90";
  addPinButton.textContent = "Add Pin";
  addPinButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const markerLat = Number(markerEl.dataset.addNewMarkerLat);
    const markerLng = Number(markerEl.dataset.addNewMarkerLng);
    onAddNewMarkerClick?.(markerLat, markerLng);
  });

  header.appendChild(title);
  header.appendChild(closeButton);

  markerDiv.appendChild(header);
  markerDiv.appendChild(subtitle);
  markerDiv.appendChild(addPinButton);

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

function updateAddNewMarkerElementCoords(
  markerEl: HTMLElement,
  lat: number,
  lng: number,
) {
  markerEl.dataset.addNewMarkerLat = String(lat);
  markerEl.dataset.addNewMarkerLng = String(lng);

  const subtitle = markerEl.querySelector(ADD_NEW_MARKER_COORDS_SELECTOR);
  if (subtitle) {
    subtitle.textContent = formatCoords(lat, lng);
  }
}

function createTrashMarkerElement(markerData: MarkerData) {
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

function createTrashMarkerPopup(popUpProps: PopupProps) {
  return new mapboxgl.Popup({
    className: "popup-title popup-subtitle",
    closeButton: false,
    offset: [0, -30],
  }).setDOMContent(createTrashMarkerPopupContent(popUpProps));
}

function createTrashMarkerPopupContent(popUpProps: PopupProps) {
  const popupContent = document.createElement("div");
  popupContent.innerHTML = createTrashMarkerPopupHtml(popUpProps);

  if (popUpProps.onFlagClick) {
    popupContent
      .querySelector("[data-flag]")
      ?.addEventListener("click", popUpProps.onFlagClick);
  }

  if (popUpProps.onUpvoteClick) {
    popupContent
      .querySelector("[data-upvote]")
      ?.addEventListener("click", popUpProps.onUpvoteClick);
  }

  return popupContent;
}

function createTrashMarkerPopupHtml({
  title,
  lat,
  lng,
  reporterName,
  photoUrls,
  status,
  onFlagClick,
  onUpvoteClick,
}: PopupProps) {
  const imageUrl = photoUrls?.[0]?.trim();
  const popupTitle = escapeHtml(title ?? "Trash pin");
  const popupReporterName = reporterName?.trim();
  const imageHtml = imageUrl
    ? `<img class="popup-image" src="${escapeHtml(imageUrl)}" alt="${popupTitle}" />`
    : `<div class="popup-image-placeholder">No image available</div>`;
  const isStatusReported = status === "REPORTED";
  const hasActions = isStatusReported && (onFlagClick || onUpvoteClick);

  const flagIconHtml = renderToStaticMarkup(
    <ThumbsDown aria-hidden="true" className="size-3" />,
  );

  const upvoteIconHtml = renderToStaticMarkup(
    <ThumbsUp aria-hidden="true" className="size-3" />,
  );

  const flagButtonHtml =
    isStatusReported && onFlagClick
      ? `<button type="button" class="popup-action-button popup-flag-button" data-flag>Flag <span>${flagIconHtml}</span></button>`
      : "";
  const upvoteButtonHtml =
    isStatusReported && onUpvoteClick
      ? `<button type="button" class="popup-action-button popup-upvote-button" data-upvote>Upvote <span>${upvoteIconHtml}</span></button>`
      : "";

  return `
    <div class="popup-body">
      ${imageHtml}
      <p class="popup-title">${popupTitle}</p>
      <p class="font-thin text-gray-400">${lat.toFixed(3)}, ${lng.toFixed(3)}</p>
      ${popupReporterName ? `<p class="popup-subtitle">Reported By: ${escapeHtml(popupReporterName)}</p>` : ""}
      ${
        hasActions
          ? `<div class="popup-actions">
          ${flagButtonHtml}
          ${upvoteButtonHtml}
        </div>`
          : ""
      }
    </div>
  `;
}

interface MapLegendsProps {
  legends: { label: string; color: string; icon: string }[];
}

function RecenterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="default"
      size="icon"
      aria-label="Recenter map to user's location"
      className="bg-white text-gray-500 active:bg-slate-100 active:scale-95 transition sm:p-4 md:p-2 "
      onClick={onClick}
    >
      <LocateFixed className="size-5" />
    </Button>
  );
}

function MapLegends({ legends }: MapLegendsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded bg-white p-3 shadow-lg sm:right-5 sm:top-5 sm:p-4 md:p-2">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="map-legends-list"
        className="flex w-full items-center justify-between gap-3"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <MapIcon className="size-4 text-gray-500" />
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id="map-legends-list"
        className={`mt-2 flex-col gap-2  sm:gap-4 ${
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

function Map({
  markers,
  onMarkerClick,
  onFlagClick,
  onUpvoteClick,
  onAddNewMarkerClick,
  onMapClick,
  lat,
  lng,
}: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const pendingAddPinMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const selectedMarkerIdRef = useRef<string | null>(null);
  const mapMarkerRegistryRef = useRef(
    new globalThis.Map<string, RenderedMarker>(),
  );
  const onMarkerClickRef = useRef(onMarkerClick);
  const onAddNewMarkerClickRef = useRef(onAddNewMarkerClick);
  const onMapClickRef = useRef(onMapClick);

  function closeSelectedMarkerPopup() {
    const selectedMarkerId = selectedMarkerIdRef.current;
    if (!selectedMarkerId) {
      return;
    }

    mapMarkerRegistryRef.current.get(selectedMarkerId)?.popup.remove();
    selectedMarkerIdRef.current = null;
  }

  function recenterToUserLocation() {
    if (lng && lat) {
      mapRef?.current?.flyTo({
        center: [lng, lat],
        essential: true,
      });
    }
  }

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    onAddNewMarkerClickRef.current = onAddNewMarkerClick;
  }, [onAddNewMarkerClick]);

  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [88.611, 27.325], // M.G Marg, Gangtok
      zoom: 17, // starting zoom
    });
    const mapMarkerRegistry = mapMarkerRegistryRef.current;
    mapRef.current = map;

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;

      onMapClickRef.current?.();

      closeSelectedMarkerPopup();

      if (pendingAddPinMarkerRef.current) {
        pendingAddPinMarkerRef.current.setLngLat([lng, lat]);
        updateAddNewMarkerElementCoords(
          pendingAddPinMarkerRef.current.getElement(),
          lat,
          lng,
        );
      } else {
        const markerEl = createAddNewMarkerElement({
          lat,
          lng,
          onAddNewMarkerClick: (markerLat, markerLng) => {
            onAddNewMarkerClickRef.current?.(markerLat, markerLng);
            pendingAddPinMarkerRef.current?.remove();
            pendingAddPinMarkerRef.current = null;
          },
          onClose: () => {
            pendingAddPinMarkerRef.current?.remove();
            pendingAddPinMarkerRef.current = null;
          },
        });

        pendingAddPinMarkerRef.current = new mapboxgl.Marker({
          element: markerEl,
          offset: [0, -70],
        })
          .setLngLat([lng, lat])
          .addTo(map);
      }
    });

    return () => {
      pendingAddPinMarkerRef.current?.remove();
      pendingAddPinMarkerRef.current = null;
      closeSelectedMarkerPopup();
      mapMarkerRegistry.forEach(({ marker }) => marker.remove());
      mapMarkerRegistry.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    mapRef.current?.setCenter([lng ?? 88.611, lat ?? 27.325]);
  }, [lat, lng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const nextMarkerIds = new Set((markers ?? []).map(({ pinId }) => pinId));

    mapMarkerRegistryRef.current.forEach(({ marker }, pinId) => {
      if (!nextMarkerIds.has(pinId)) {
        marker.remove();
        mapMarkerRegistryRef.current.delete(pinId);
        if (selectedMarkerIdRef.current === pinId) {
          selectedMarkerIdRef.current = null;
        }
      }
    });

    (markers ?? []).forEach((markerData) => {
      const renderedMarker = mapMarkerRegistryRef.current.get(markerData.pinId);

      if (renderedMarker) {
        renderedMarker.data = markerData;
        renderedMarker.marker.setLngLat([markerData.lng, markerData.lat]);
        renderedMarker.markerImg.alt = markerData.title ?? "Map marker";
        renderedMarker.popup.setDOMContent(
          createTrashMarkerPopupContent({
            ...markerData,
            onFlagClick: onFlagClick
              ? () => onFlagClick(markerData.pinId, markerData)
              : null,
            onUpvoteClick: onUpvoteClick
              ? () => onUpvoteClick(markerData.pinId, markerData)
              : null,
          }),
        );
        return;
      }

      const { markerEl, markerImg } = createTrashMarkerElement(markerData);
      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat([markerData.lng, markerData.lat])
        .addTo(map);
      const popup = createTrashMarkerPopup({
        ...markerData,
        onFlagClick: onFlagClick
          ? () => onFlagClick(markerData.pinId, markerData)
          : null,
        onUpvoteClick: onUpvoteClick
          ? () => onUpvoteClick(markerData.pinId, markerData)
          : null,
      });
      const renderedMarkerEntry: RenderedMarker = {
        marker,
        popup,
        markerImg,
        data: markerData,
      };

      markerEl.style.cursor = "pointer";
      markerEl.addEventListener("mouseenter", () => {
        markerImg.style.transform = "scale(1.2)";
        // popup.addTo(map);
      });
      markerEl.addEventListener("mouseleave", () => {
        markerImg.style.transform = "scale(1)";
        // if (selectedMarkerIdRef.current !== renderedMarkerEntry.data.pinId) {
        //   popup.remove();
        // }
      });
      markerEl.addEventListener("click", (event) => {
        event.stopPropagation();
        const latestMarkerData = renderedMarkerEntry.data;
        onMarkerClickRef.current?.(latestMarkerData.pinId, latestMarkerData);
        pendingAddPinMarkerRef.current?.remove();
        pendingAddPinMarkerRef.current = null;
        closeSelectedMarkerPopup();
        selectedMarkerIdRef.current = latestMarkerData.pinId;
        popup.addTo(map);
        map.flyTo({
          center: [latestMarkerData.lng, latestMarkerData.lat],
          essential: true,
        });
      });

      marker.setPopup(popup);
      mapMarkerRegistryRef.current.set(markerData.pinId, renderedMarkerEntry);
    });
  }, [markers, onFlagClick, onUpvoteClick]);

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute right-3 top-3 z-10 p-3 
      flex flex-col gap-0.5 items-end 
      sm:right-5 sm:top-5 sm:w-2xs sm:p-4"
      >
        <MapLegends legends={legends} />
        <RecenterButton onClick={recenterToUserLocation} />
      </div>
      <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
    </div>
  );
}

export default Map;
