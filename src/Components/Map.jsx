import { useState, useMemo, useEffect } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";

function Map({ userLocation, radius, language }) {
  const center = useMemo(() => userLocation, [userLocation]);
  const [open, setOpen] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [placeVicinity, setPlaceVicinity] = useState("");
  const [placeRating, setPlaceRating] = useState("");
  const [placeWebsite, setPlaceWebsite] = useState("");
  const [places, setPlaces] = useState(null);
  const [clickedMarkers, setClickedMarkers] = useState({});
  

  const handleSaveSchool = async (e) => {
    const formData = {
      name: placeName,
      vicinity: placeVicinity,
      rating: placeRating,
      website: placeWebsite,
    };
    const res = await axios.post("/save-school", formData);
    if (res.data.success) {
      console.log("successfully added");
      toast.success("Added to your Schools!");
    } else toast.error("This school has already been added");
  };

  const addClick = (placeId) => {
    handleSaveSchool();
    setClickedMarkers((prevClickedMarkers) => ({
      ...prevClickedMarkers,
      [placeId]: true, // Set the clicked state for the specific marker
    }));
  };

  useEffect(() => {
    // send lat/lng to server so it can send get request to find language schools within 25 miles
    if (userLocation) {
      // console.log(radius);
      const { lat, lng } = userLocation;
      axios
        .get(
          `http://localhost:2222/api/places?lat=${lat}&lng=${lng}&radius=${radius}&language=${language}`
        )
        .then(({ data }) => {
          //set all places equal to the results sent back by server and map through them to separate by individual location
          const allPlaces = data.results.map((place) => {
            let position = {
              lat: +place.geometry.location.lat,
              lng: +place.geometry.location.lng,
            };

            //return a marker for each individual location and have it open an infowindow when clicked
            let htmlString =
              '<a href="https://maps.google.com/maps/contrib/100961532820129391672">A Google User</a>';
            let doc = new DOMParser().parseFromString(htmlString, "text/html");
            let links = doc.querySelectorAll("a");
            const { name, rating, vicinity } = place;
            //if the place icon equals the "graduation cap" which signifies it is a school, return the marker for it
            return (
              place.icon ===
                "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png" && (
                <div key={place.place_id}>
                  <MarkerF
                    position={position}
                    onClick={() => {
                      setOpen(true);
                      setSelectedMarkerId(place.place_id);
                      setPlaceName(name);
                      setPlaceVicinity(vicinity);
                      setPlaceRating(rating);
                      setPlaceWebsite(links[0].href);
                    }}
                  >
                    {open && selectedMarkerId === place.place_id && (
                      <InfoWindowF
                        position={position}
                        onCloseClick={() => setOpen(false)}
                      >
                        <>
                          <h1>{name}</h1>
                          <p>rating: {rating}</p>
                          <p> Address: {vicinity}</p>
                          <a href={links[0].href}>{links[0].href}</a>
                          <br></br>
                          <div>
                            {clickedMarkers[place.place_id] ? (
                              <p>Added</p>
                            ) : (
                              <button onClick={() => addClick(place.place_id)}>
                                Add
                              </button>
                            )}
                          </div>
                        </>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                </div>
              )
            );
          });

          setPlaces(allPlaces);
          // console.log(language);
        })
        .catch((err) => console.log(err));
    }
  }, [userLocation, open, selectedMarkerId, radius, language, clickedMarkers]);

  return (
    <>
      <div style={{ marginTop: "50px" }}></div>
      {/* GoogleMap component */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {/* set height of the map (this is the only way I could get it to render) */}
        <div style={{ height: "60vh" }}></div>

        {/* Display language school markers */}
        {places && places}
      </GoogleMap>
    </>
  );
}

export default Map;
