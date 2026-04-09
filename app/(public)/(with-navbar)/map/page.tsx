"use client";
import Map from "./_components/MapView";

const exampleMarkers = [
  {
    lng: 88.611,
    lat: 27.325,
    pinId: "pin1",
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
        <div className="col-span-3">
          <h1 className="text-2xl font-bold text-center mt-4">Side Panel</h1>
        </div>
        {/* Map View */}
        <div className="col-span-9  h-full flex flex-col">
          <div className="w-full h-full flex-1">
            <Map markers={exampleMarkers} onMarkerClick={onMarkerClick} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MapPage;
