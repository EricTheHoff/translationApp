import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import Map from "../Components/Map";
import MapForm from "../Components/MapForm";

const libraries = ["places"];

function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [radius, setRadius] = useState(16093.4);
  const [language, setLanguage] = useState("language");
  const [userLocation, setUserLocation] = useState(null);
  const [zipcode, setZipcode] = useState("");
  const [userZipcode, setUserZipcode] = useState(null);

  //access zipcode user entered on registration
  useEffect(() => {
    axios.get("/user").then((response) => {
      setUserZipcode(response.data.zipCode);
      console.log(userZipcode);
    });
  }, []);

  //set the radius equal to whatever is selected on dropdown
  const changeRadius = (e) => {
    e.preventDefault();
    const selectedRadius = e.target.value;
    setRadius(selectedRadius);
  };

  //set the language equal to whatever is selected on dropdown
  const changeLanguage = (e) => {
    e.preventDefault();
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    // Get user's location when the component renders
    if (userZipcode) {
      setUserLocation(userZipcode);
    } else if (navigator.geolocation) {
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

  //stores zipcode entered
  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  //changes geolocation based on what was entered as zipcode
  const handleZipcodeSubmit = () => {
    // Fetch latitude and longitude based on the entered zipcode
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${
          import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY
        }`
      )
      .then(({ data }) => {
        // console.log(data);
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map userLocation={userLocation} radius={radius} language={language} />
      <MapForm
        changeRadius={changeRadius}
        onZipcodeChange={handleZipcodeChange}
        onZipcodeSubmit={handleZipcodeSubmit}
        zipcode={zipcode}
        changeLanguage={changeLanguage}
      />
    </>
  );
}

export default MapPage;
