import { useState, useMemo, useEffect } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/map.css";
import { HiOutlineCheckCircle } from "react-icons/hi2";

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
      const { lat, lng } = userLocation;
      axios
        .get(
          `http://localhost:2222/api/places?lat=${lat}&lng=${lng}&radius=${radius}&language=${language}`
        )
        .then(({ data }) => {
          const extractUrlFromAttributions = (attributions) => {
            const regex = /href="([^"]*)"/;
            const match = attributions.match(regex);
            return match ? match[1] : "";
          };
          //set all places equal to the results sent back by server and map through them to separate by individual location
          const allPlaces = data.results.map((place) => {
            let position = {
              lat: +place.geometry.location.lat,
              lng: +place.geometry.location.lng,
            };
            const photoLink =
              place.photos && place.photos.length > 0
                ? extractUrlFromAttributions(
                    place.photos[0].html_attributions[0]
                  )
                : "";
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
                      setPlaceWebsite(photoLink);
                    }}
                  >
                    {open && selectedMarkerId === place.place_id && (
                      <div className="info-window">
                        <InfoWindowF
                          position={position}
                          onCloseClick={() => setOpen(false)}
                        >
                          <>
                            <h1
                              style={{
                                margin: "0",
                                textAlign: "center",
                                fontSize: "2.5em",
                                color: "#283845",
                                fontFamily: "cursive",
                                width: "100%",
                              }}
                            >
                              {name}
                            </h1>
                            <ul
                              style={{
                                marginTop: "15px",
                                fontSize: "20px",
                              }}
                            >
                              <li
                                style={{
                                  fontFamily: "helvetica",
                                  marginBottom: "8px",
                                  color: "#283845",
                                }}
                              >
                                Rating: {rating}
                              </li>
                              <li
                                style={{
                                  fontFamily: "helvetica",
                                  marginBottom: "8px",
                                  color: "#283845",
                                }}
                              >
                                {" "}
                                Address: {vicinity}
                              </li>
                              <li
                                style={{
                                  fontFamily: "helvetica",
                                  marginBottom: "8px",
                                  color: "#283845",
                                  width: "100%",
                                  maxWidth: "200px",
                                }}
                              >
                                Website:{" "}
                                {placeWebsite ? (
                                  <a
                                    style={{
                                      fontFamily: "helvetica",
                                      color: "blue",
                                    }}
                                    href={placeWebsite}
                                  >
                                    {placeWebsite}
                                  </a>
                                ) : (
                                  <p>N/A</p>
                                )}
                              </li>
                            </ul>
                            <br></br>
                            <div>
                              {clickedMarkers[place.place_id] ? (
                                <HiOutlineCheckCircle
                                  style={{
                                    fontSize: "35px",
                                    marginLeft: "10px",
                                  }}
                                />
                              ) : (
                                <button
                                  // style={{ marginBottom: "30px" }}
                                  className="btn btn-primary ibtn"
                                  onClick={() => addClick(place.place_id)}
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </>
                        </InfoWindowF>
                      </div>
                    )}
                  </MarkerF>
                </div>
              )
            );
          });

          setPlaces(allPlaces);
        })
        .catch((err) => console.log(err));
    }
  }, [userLocation, open, selectedMarkerId, radius, language, clickedMarkers]);

  return (
    <>
      <div className="map-container">
        {/* GoogleMap component */}
        <GoogleMap zoom={10} center={center}>
          {/* set height of the map (this is the only way I could get it to render) */}
          <div
            style={{
              height: "63vh",
            }}
          ></div>

          {/* Display language school markers */}
          {places && places}
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;
