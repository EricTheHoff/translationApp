import { useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
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
import Map from "../Components/Map";

function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc",
    libraries: ["places"],
  });

  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState(null);
  const [zipcode, setZipcode] = useState("");
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState("");

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
            console.log(place.name);
            let position = {
              lat: +place.geometry.location.lat,
              lng: +place.geometry.location.lng,
            };
            return (
              <div>
                <MarkerF
                  key={place.name}
                  position={position}
                  onClick={() => setOpen(true)}
                >
                  {open && (
                    <InfoWindowF position={position}>
                      <>
                        <h1>{place.name}</h1>
                        <p>rating: {place.rating}</p>
                        <p> Address: {place.vicinity}</p>
                        <label>
                          Save To My Schools:
                          <input type="checkbox" />
                        </label>
                      </>
                    </InfoWindowF>
                  )}
                </MarkerF>
              </div>
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

export default MapPage;
