"use client";
import { FAB } from "@/components/common/FAB";
import FullScreenDialog from "@/components/common/FullScreenDialog";
import { SearchBox } from "@/components/common/SearchBox";
import AddPinForm from "@/components/forms/AddPinForm";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserLocation } from "@/lib/utils";
import { CheckCircle2Icon, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import BottomSheet from "./_components/BottomSheet";
import EventCard, { type EventCardProps } from "./_components/EventCard";
import Map from "./_components/MapView";
import type { MarkerData } from "./_components/MapView";
import { addPin, uploadTrashPhoto } from "@/lib/api/pins";
import { ApiError } from "@/lib/api/client";
import type { AddPinFormInputs } from "@/components/forms/AddPinForm";
import ResponseAlert from "@/components/common/ResponseAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPins } from "@/store/features/pins/pinsSlice";
import Loading from "@/components/common/Loading";
import { getEvent } from "@/lib/api/event";
import type { Event } from "@/models/event";
import type { PinStatus } from "@/models/pins";
import { useAuth } from "@/components/providers/AuthProvider";

type EventFilter = {
  range: "1km" | "5km" | "20km";
};

const PIN_STATUS_OPTIONS: { value: PinStatus; label: string }[] = [
  { value: "REPORTED", label: "Reported" },
  { value: "VERIFIED", label: "Verified" },
  { value: "CLEANUP_SCHEDULED", label: "Cleanup scheduled" },
  { value: "CLEANED", label: "Cleaned" },
];

function MapPage() {
  const [userLocation, setUserLocation] = useState<
    | {
        lng: number;
        lat: number;
      }
    | undefined
  >({
    lat: 27.325,
    lng: 88.611,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [openAddPinModal, setOpenAddPinModal] = useState(false);
  const [addPinError, setAddPinError] = useState<string | null>(null);
  const [addPinSuccess, setAddPinSuccess] = useState<string | null>(null);
  const [selectedPinLocation, setSelectedPinLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPin, setSelectedPin] = useState<MarkerData | null>(null);
  const [pinStatusFilters, setPinStatusFilters] = useState<PinStatus>(
    PIN_STATUS_OPTIONS[0].value,
  );

  const [events, setEvents] = useState<Event[]>([]);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<EventFilter>({
    range: "20km",
  });

  const { pins, loading } = useAppSelector((state) => {
    return state.pins;
  });

  const fetchEvents = useCallback(async () => {
    if (!userLocation) return;

    setIsEventLoading(true);
    setEventError(null);

    try {
      const res = await getEvent({
        lat: userLocation?.lat || 27.325,
        lng: userLocation?.lng || 88.611,
        range: eventFilter.range,
      });
      setEvents(res.events);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong while fetching events.";

      setEventError(message);
    } finally {
      setIsEventLoading(false);
    }
  }, [userLocation, eventFilter.range]);

  const mapMarkers = useMemo(
    () => [
      ...pins.filter(
        (pin): pin is typeof pin & { pinId: string } =>
          Boolean(pin.pinId) && pin.status === pinStatusFilters,
      ),
      {
        pinId: "current-location",
        lat: userLocation?.lat || 27.325,
        lng: userLocation?.lng || 88.611,
        title: "Your Current Location",
        city: "",
        state: "",
        severity: "LOW" as const,
        description: "This is where you are right now.",
      },
    ],
    [pins, pinStatusFilters, userLocation],
  );

  const eventCards = useMemo<EventCardProps[]>(
    () =>
      events.map((event) => ({
        eventId: event.eventId,
        name: event.name,
        description: event.description,
        image: event.photoUrls?.[0],
        reportedAt: new Date(event.scheduledAt).toLocaleDateString(),
        distance: "0",
        link: `/events/${event.eventId}`,
      })),
    [events],
  );

  useEffect(() => {
    function handleResize() {
      setIsBottomSheetOpen(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     const location = await getUserLocation();
  //     if (location.success) {
  //       setUserLocation({
  //         lng: parseFloat(location.message.split(",")[0].split(":")[1].trim()),
  //         lat: parseFloat(location.message.split(",")[1].split(":")[1].trim()),
  //       });
  //     }
  //   };
  //   fetchLocation();
  // }, []);

  useEffect(() => {
    if (!addPinSuccess) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAddPinSuccess(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [addPinSuccess]);

  useEffect(() => {
    dispatch(
      fetchPins({
        status: pinStatusFilters,
      }),
    );
  }, [dispatch, pinStatusFilters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function onMarkerClick(_pinId: string, marker: MarkerData) {
    setSelectedPin(marker);
  }

  function handleAddNewMarkerClick(lat: number, lng: number) {
    // if not authenticate
    if (isAuthenticated) {
      setAddPinError(null);
      setAddPinSuccess(null);
      setSelectedPinLocation({ lat, lng });
      setOpenAddPinModal(true);
    } else {
      router.push("/login");
    }
  }

  async function handleAddPinSubmit(data: AddPinFormInputs) {
    setAddPinError(null);
    setAddPinSuccess(null);

    try {
      const photo = data.photo?.[0];
      const photoKey = photo ? await uploadTrashPhoto(photo) : undefined;

      await addPin({
        ...data,
        photoKey: photoKey ? [photoKey] : undefined,
      });
      setOpenAddPinModal(false);
      setAddPinSuccess("Pin reported successfully.");
      await dispatch(
        fetchPins({
          status: pinStatusFilters,
        }),
      ).unwrap();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong while reporting this pin.";

      setAddPinError(message);
    }
  }

  return (
    <main className="flex h-[calc(100dvh-4.5rem)] min-h-0 flex-col overflow-hidden md:h-[calc(100dvh-3.75rem)]">
      {addPinSuccess ? (
        <ResponseAlert
          title="Success"
          description={addPinSuccess}
          icon={<CheckCircle2Icon />}
        />
      ) : null}
      <FullScreenDialog
        title="Add New Pin"
        open={openAddPinModal}
        onOpenChange={(open) => {
          setOpenAddPinModal(open);
          if (open) {
            setAddPinError(null);
          }
        }}
        showCloseButton
      >
        {addPinError ? (
          <div className="mb-4 rounded-md border border-error/30 bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
            {addPinError}
          </div>
        ) : null}
        <AddPinForm
          onSubmit={handleAddPinSubmit}
          defaultValues={
            selectedPinLocation
              ? {
                  lat: String(selectedPinLocation.lat),
                  lng: String(selectedPinLocation.lng),
                }
              : undefined
          }
        />
        {/* Add Pin Form or Content */}
      </FullScreenDialog>
      <div className="grid min-h-0 flex-1 grid-cols-12">
        {/* Side Panel */}
        {/* <div className="hidden md:col-span-4 lg:col-span-3 px-3 md:flex flex-col gap-3">
          <div className="px-2">
            <p className="md:text-lg lg:text-2xl font-bold text-primary mt-4">
              Nearby Hotspots
            </p>
            <p className="text-secondary text-sm">
              Explore spots you can help clean up.
            </p>
          </div>
          <SearchAndEventList
            userLocation={userLocation}
            events={eventCards}
            isLoading={isEventLoading}
            error={eventError}
            eventFilter={eventFilter}
            setEventFilter={setEventFilter}
          />
        </div> */}
        {/* Map View */}
        <div className="z-1 col-span-12 flex min-h-0 flex-col">
          <div className="relative min-h-0 w-full flex-1">
            <PinFilters
              statuses={pinStatusFilters}
              onStatusesChange={setPinStatusFilters}
            />
            <Map
              markers={mapMarkers}
              onMarkerClick={onMarkerClick}
              onMapClick={() => setSelectedPin(null)}
              onAddNewMarkerClick={handleAddNewMarkerClick}
              lat={userLocation?.lat}
              lng={userLocation?.lng}
            />
            {loading ? (
              <div className="absolute inset-0 z-20 grid place-items-center bg-surface/60">
                <Loading />
              </div>
            ) : null}
          </div>
        </div>
        {/* Bottom Sheet */}
        <BottomSheet isOpen={isBottomSheetOpen}>
          <SearchAndEventList
            userLocation={userLocation}
            events={eventCards}
            isLoading={isEventLoading}
            error={eventError}
            eventFilter={eventFilter}
            setEventFilter={setEventFilter}
          />
        </BottomSheet>
      </div>
    </main>
  );
}

function PinFilters({
  statuses,
  onStatusesChange,
}: {
  statuses: PinStatus;
  onStatusesChange: React.Dispatch<React.SetStateAction<PinStatus>>;
}) {
  return (
    <div className="absolute top-4 left-1/2 z-10 w-full max-w-3xl -translate-x-1/2 px-4 md:px-0">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm">
        {PIN_STATUS_OPTIONS.map(({ value, label }) => {
          const id = `pin-status-${value.toLowerCase()}`;

          return (
            <label
              key={value}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-slate-700"
            >
              <Checkbox
                id={id}
                checked={statuses === value}
                onCheckedChange={(checked) =>
                  onStatusesChange(checked === true ? value : statuses)
                }
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function SearchAndEventList({
  eventFilter,
  setEventFilter,
  userLocation,
  events,
  isLoading,
  error,
}: {
  userLocation: { lng: number; lat: number } | undefined;
  events: EventCardProps[];
  isLoading: boolean;
  error: string | null;
  eventFilter: EventFilter;
  setEventFilter: React.Dispatch<React.SetStateAction<EventFilter>>;
}) {
  return (
    <div className="p-2">
      <SearchBox
        label="Search cleanup events"
        className="h-8 md:h-10"
        inputClassName="h-8 md:h-10 text-sm md:text-lg"
        iconClassName="top-1.5 md:top-2.5 h-5 w-5"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center text-sm text-neutral-500 my-4">
          <MapPin className="w-4 h-4" />
          <span>
            {userLocation
              ? `${userLocation.lng.toFixed(3)}, ${userLocation.lat.toFixed(3)}`
              : "Could not retrieve your location"}
          </span>
        </div>
        <RangeFilter
          eventFilter={eventFilter}
          setEventFilter={setEventFilter}
        />
      </div>
      <div className="flex flex-col gap-3 p-2 flex-1 overflow-auto max-h-145 min-w-0">
        {isLoading ? <Loading /> : null}
        {error ? <p className="text-sm text-error">{error}</p> : null}
        {!isLoading && !error && events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-4 py-6 text-center">
            <p className="text-sm font-semibold text-on-surface">
              No cleanup events nearby
            </p>
            <p className="mt-1 text-xs text-on-surface-variant">
              Try another location or check back later.
            </p>
          </div>
        ) : null}
        {!isLoading && !error && events.length > 0
          ? events.map((event) => (
              <EventCard
                key={event.eventId}
                eventId={event.eventId}
                name={event.name}
                description={event.description}
                image={event.image}
                reportedAt={event.reportedAt}
                distance={event.distance}
                link={event.link}
              />
            ))
          : null}
      </div>
    </div>
  );
}

function RangeFilter({
  eventFilter,
  setEventFilter,
}: {
  eventFilter: EventFilter;
  setEventFilter: React.Dispatch<React.SetStateAction<EventFilter>>;
}) {
  return (
    <Select
      value={eventFilter.range}
      onValueChange={(value) =>
        setEventFilter((prev) => ({
          ...prev,
          range: value as "1km" | "5km" | "20km",
        }))
      }
    >
      <SelectTrigger className="w-full max-w-37.5">
        <SelectValue placeholder="Filter by range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1km">Within 1 km</SelectItem>
        <SelectItem value="5km">Within 5 km</SelectItem>
        <SelectItem value="20km">Within 20 km</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default MapPage;
