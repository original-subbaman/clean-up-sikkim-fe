"use client";
import { FAB } from "@/components/common/FAB";
import FullScreenDialog from "@/components/common/FullScreenDialog";
import { SearchBox } from "@/components/common/SearchBox";
import AddPinForm from "@/components/forms/AddPinForm";
import { getUserLocation } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomSheet from "./_components/BottomSheet";
import EventCard, { type EventCardProps } from "./_components/EventCard";
import { pins } from "@/lib/mock";
import Map from "./_components/MapView";

const events: EventCardProps[] = [
  {
    eventId: "event1",
    title: "Riverbank Cleanup",
    description: "Plastic and bottles scattered along the riverbank.",
    image: undefined,
    reportedAt: "2026-04-09",
    distance: "1.2 km",
  },
  {
    eventId: "event2",
    title: "Park Litter",
    description: "Overflowing trash bins in the city park.",
    image: undefined,
    reportedAt: "2026-04-08",
    distance: "0.8 km",
  },
  {
    eventId: "event3",
    title: "Roadside Waste",
    description: "Piles of garbage dumped by the roadside.",
    image: undefined,
    reportedAt: "2026-04-07",
    distance: "2.5 km",
  },
  {
    eventId: "event4",
    title: "Market Area Mess",
    description: "Food wrappers and plastic bags near the market.",
    image: undefined,
    reportedAt: "2026-04-06",
    distance: "1.7 km",
  },
  {
    eventId: "event5",
    title: "School Grounds",
    description: "Litter found around the school playground.",
    image: undefined,
    reportedAt: "2026-04-05",
    distance: "3.0 km",
  },
  {
    eventId: "event6",
    title: "Bus Stop Trash",
    description: "Garbage bags left at the main bus stop.",
    image: undefined,
    reportedAt: "2026-04-04",
    distance: "0.5 km",
  },
  {
    eventId: "event7",
    title: "Hilltop Debris",
    description: "Construction debris found on the hilltop trail.",
    image: undefined,
    reportedAt: "2026-04-03",
    distance: "4.1 km",
  },
  {
    eventId: "event8",
    title: "Playground Mess",
    description: "Plastic bottles and wrappers scattered in the playground.",
    image: undefined,
    reportedAt: "2026-04-02",
    distance: "2.2 km",
  },
  {
    eventId: "event9",
    title: "Temple Entrance Waste",
    description: "Offerings and plastic waste near the temple entrance.",
    image: undefined,
    reportedAt: "2026-04-01",
    distance: "3.8 km",
  },
  {
    eventId: "event10",
    title: "Shopping Complex Litter",
    description: "Litter found in the parking area of the shopping complex.",
    image: undefined,
    reportedAt: "2026-03-31",
    distance: "1.5 km",
  },
];
function MapPage() {
  const [userLocation, setUserLocation] = useState<
    | {
        lng: number;
        lat: number;
      }
    | undefined
  >(undefined);

  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [openAddPinModal, setOpenAddPinModal] = useState(false);
  const isAuthenticated = true; // Replace with actual authentication logic later

  useEffect(() => {
    function handleResize() {
      setIsBottomSheetOpen(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation();
      if (location.success) {
        setUserLocation({
          lng: parseFloat(location.message.split(",")[0].split(":")[1].trim()),
          lat: parseFloat(location.message.split(",")[1].split(":")[1].trim()),
        });
      }
    };
    fetchLocation();
  }, []);

  function onMarkerClick(
    pinId: string,
    marker: { lng: number; lat: number; pinId: string },
  ) {}

  function handleFABClick() {
    // if not authenticate
    if (isAuthenticated) {
      setOpenAddPinModal(true);
    } else {
      router.push("/login");
    }
  }

  return (
    <main className="flex-1 flex flex-col ">
      <FullScreenDialog
        title="Add New Pin"
        open={openAddPinModal}
        onOpenChange={setOpenAddPinModal}
        showCloseButton
      >
        <AddPinForm
          onSubmit={(data) => {
            console.log("data", data);
          }}
        />
        {/* Add Pin Form or Content */}
      </FullScreenDialog>
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
          <SearchAndEventList userLocation={userLocation} events={events} />
        </div>
        {/* Map View */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full flex flex-col z-1">
          <div className="w-full h-full flex-1">
            <Map markers={pins} onMarkerClick={onMarkerClick} />
          </div>
        </div>
        <FAB onClick={handleFABClick} position="right" />
        {/* Bottom Sheet */}
        <BottomSheet isOpen={isBottomSheetOpen}>
          <SearchAndEventList userLocation={userLocation} events={events} />
        </BottomSheet>
      </div>
    </main>
  );
}

function SearchAndEventList({
  userLocation,
  events,
}: {
  userLocation: { lng: number; lat: number } | undefined;
  events: EventCardProps[];
}) {
  return (
    <div className="p-2">
      <SearchBox
        label="Search by clean up events near you"
        className="h-8 md:h-10" // container height
        inputClassName="h-8 md:h-10 text-sm md:text-lg" // input height and font size
        iconClassName="top-1.5 md:top-2.5 h-5 w-5"
      />
      <div className="flex gap-1 items-center text-sm text-neutral-500 my-4">
        <MapPin className="w-4 h-4" />
        <span>
          {userLocation
            ? `${userLocation.lng.toFixed(3)}, ${userLocation.lat.toFixed(3)}`
            : "Could not retrieve your location"}
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-auto max-h-145 min-w-0">
        {events && events.length > 0
          ? events.map((event) => (
              <EventCard
                key={event.eventId}
                eventId={event.eventId}
                title={event.title}
                description={event.description}
                image={event.image}
                reportedAt={event.reportedAt}
                distance={event.distance}
                link={`/events/${event.eventId}`} // Replace with actual event link when available
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default MapPage;
