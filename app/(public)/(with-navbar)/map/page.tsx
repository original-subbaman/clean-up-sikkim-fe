"use client";
import { SearchBox } from "@/components/common/SearchBox";
import EventCard, { type EventCardProps } from "./_components/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Map from "./_components/MapView";
import { MapPin, PinIcon } from "lucide-react";

const exampleMarkers = [
  {
    lng: 88.611,
    lat: 27.325,
    pinId: "pin1",
  },
];

const pins: EventCardProps[] = [
  {
    title: "Riverbank Cleanup",
    description: "Plastic and bottles scattered along the riverbank.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    reportedAt: "2026-04-09",
    distance: "1.2 km",
  },
  {
    title: "Park Litter",
    description: "Overflowing trash bins in the city park.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    reportedAt: "2026-04-08",
    distance: "0.8 km",
  },
  {
    title: "Roadside Waste",
    description: "Piles of garbage dumped by the roadside.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    reportedAt: "2026-04-07",
    distance: "2.5 km",
  },
  {
    title: "Market Area Mess",
    description: "Food wrappers and plastic bags near the market.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    reportedAt: "2026-04-06",
    distance: "1.7 km",
  },
  {
    title: "School Grounds",
    description: "Litter found around the school playground.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    reportedAt: "2026-04-05",
    distance: "3.0 km",
  },
  {
    title: "Bus Stop Trash",
    description: "Garbage bags left at the main bus stop.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    reportedAt: "2026-04-04",
    distance: "0.5 km",
  },
  {
    title: "Hilltop Debris",
    description: "Construction debris found on the hilltop trail.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    reportedAt: "2026-04-03",
    distance: "4.1 km",
  },
  {
    title: "Playground Mess",
    description: "Plastic bottles and wrappers scattered in the playground.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    reportedAt: "2026-04-02",
    distance: "2.2 km",
  },
  {
    title: "Temple Entrance Waste",
    description: "Offerings and plastic waste near the temple entrance.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    reportedAt: "2026-04-01",
    distance: "3.8 km",
  },
  {
    title: "Shopping Complex Litter",
    description: "Litter found in the parking area of the shopping complex.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    reportedAt: "2026-03-31",
    distance: "1.5 km",
  },
];

function MapPage() {
  function onMarkerClick(
    pinId: string,
    marker: { lng: number; lat: number; pinId: string },
  ) {
    alert(`Marker clicked: ${pinId} at [${marker.lng}, ${marker.lat}]`);
  }
  return (
    <main className="flex-1 flex flex-col ">
      <div className="grid grid-cols-12 flex-1">
        {/* Side Panel */}
        <div className="hidden md:col-span-4 lg:col-span-3 px-3 md:flex flex-col gap-3">
          <div>
            <p className="md:text-lg lg:text-2xl font-bold text-primary mt-4">
              Nearby Hotspots
            </p>
            <p className="text-secondary text-sm">
              Explore spots you can help clean up.
            </p>
          </div>
          <div>
            <SearchBox
              label="Search by location"
              className="h-10" // container height
              inputClassName="h-10 text-lg" // input height and font size
              iconClassName="top-2.5 h-5 w-5"
            />
            <div className="flex gap-1 items-center text-sm text-neutral-500 my-4">
              <MapPin className="w-4 h-4" />
              <span>88.611, 27.325</span>
            </div>
            <div className="flex flex-col gap-3 flex-1 overflow-auto max-h-145 min-w-0">
              {pins && pins.length > 0
                ? pins.map((pin, index) => (
                    <EventCard
                      key={index}
                      title={pin.title}
                      description={pin.description}
                      image={pin.image}
                      reportedAt={pin.reportedAt}
                      distance={pin.distance}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        {/* Map View */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full flex flex-col">
          <div className="w-full h-full flex-1">
            <Map markers={exampleMarkers} onMarkerClick={onMarkerClick} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MapPage;
