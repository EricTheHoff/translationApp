import { useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import axios from "axios";
import Map from "../Components/Map";

function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc",
    libraries: ["places"],
  });

  // state
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState(null);
  const [zipcode, setZipcode] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  useEffect(() => {
    // Get user's location when the component renders
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
      //if geolocation is denied by user, set location to SLC when component renders
    } else {
      setUserLocation({ lat: 40.7608, lng: 111.891 });
    }
  }, []);

  useEffect(() => {
    // send lat/lng to server so it can send get request to find language schools within 25 miles
    if (userLocation) {
      const { lat, lng } = userLocation;
      axios
        .get(`http://localhost:2222/api/places?lat=${lat}&lng=${lng}`)
        .then(({ data }) => {
          console.log(data.results);
          //set all places equal to the results sent back by server and map through them to separate by individual location
          const allPlaces = data.results.map((place) => {
            let position = {
              lat: +place.geometry.location.lat,
              lng: +place.geometry.location.lng,
            };
            //return a marker for each individual location and have it open an infowindow when clicked
            return (
              <div key={place.name}>
                <MarkerF
                  position={position}
                  onClick={() => {
                    setOpen(true);
                    setSelectedMarkerId(place.place_id);
                  }}
                >
                  {open && selectedMarkerId === place.place_id && (
                    <InfoWindowF
                      position={position}
                      onCloseClick={() => setOpen(false)}
                    >
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
          setPlaces(allPlaces);
        })
        .catch((err) => console.log(err));
    }
  }, [userLocation, open, selectedMarkerId]);

  //stores zipcode entered
  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  //changes geolocation based on what was entered as zipcode
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
