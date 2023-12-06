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

function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc",
    libraries: ["places"],
  });

  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState(null);
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    // Get user's location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { lat, lng } = userLocation;
      axios
        .get(`http://localhost:2222/api/places?lat=${lat}&lng=${lng}`)
        .then(({ data }) => {
          console.log(data.results);

          const allPlaces = data.results.map((place) => {
            console.log(place);
            return (
              <Marker
                position={{
                  lat: +place.geometry.location.lat,
                  lng: +place.geometry.location.lng,
                }}
              />
            );
          });
          console.log(allPlaces);
          console.log(data.results[0].geometry.location.lat);
          setPlaces(allPlaces);

          // Handle your data as needed
        })
        .catch((err) => console.log(err));
    }
  }, [userLocation]);

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleZipcodeSubmit = () => {
    // Fetch latitude and longitude based on the entered zipcode
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc`
      )
      .then(({ data }) => {
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      userLocation={userLocation}
      places={places}
      zipcode={zipcode}
      onZipcodeChange={handleZipcodeChange}
      onZipcodeSubmit={handleZipcodeSubmit}
    />
  );
}

function Map({
  userLocation,
  places,
  onZipcodeChange,
  onZipcodeSubmit,
  zipcode,
}) {
  const center = useMemo(() => userLocation, [userLocation]);
  const [selected, setSelected] = useState(null);

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
      <div className="places-container">
        {/* PlacesAutocomplete component */}
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

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
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default MapPage;
