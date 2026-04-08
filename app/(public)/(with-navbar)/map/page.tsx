function MapPage() {
  return (
    <main className="flex-1 flex flex-col ">
      <div className="grid grid-cols-12 flex-1">
        {/* Side Panel */}
        <div className="col-span-3">
          <h1 className="text-2xl font-bold text-center mt-4">Side Panel</h1>
        </div>
        {/* Map View */}
        <div className="col-span-9">
          <h1 className="text-2xl font-bold text-center mt-4">Map View</h1>
        </div>
      </div>
    </main>
  );
}

export default MapPage;
