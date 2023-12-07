import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";

function Map({
  userLocation,
  places,
  onZipcodeChange,
  onZipcodeSubmit,
  zipcode,
}) {
  const center = useMemo(() => userLocation, [userLocation]);

  return (
    <>
      <div className="zipcode-container">
        <input
          type="text"
          value={zipcode}
          onChange={onZipcodeChange}
          placeholder="Enter zipcode"
        />
        <button onClick={onZipcodeSubmit}>Submit</button>
      </div>
      <div className="places-container"></div>

      {/* GoogleMap component */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        <div style={{ height: "80vh" }}></div>

        {/* Display language school markers */}
        {places && places}

        {/* Display selected marker */}
      </GoogleMap>
    </>
  );
}

export default Map;
