import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map({ userLocation, places }) {
  const center = useMemo(() => userLocation, [userLocation]);

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      {/* GoogleMap component */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {/* set height of the map (this is the only way I could get it to render) */}
        <div style={{ height: "80vh" }}></div>

        {/* Display language school markers */}
        {places && places}
      </GoogleMap>
    </>
  );
}

export default Map;
