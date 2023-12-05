import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapPage = () => {
  const apiKey = "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc";
  const mapId = "54270da3c38d6426";
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <APIProvider apiKey={apiKey}>
        <div style={{ height: "100vh" }}>
          <Map
            zoom={3}
            center={{ lat: 40.2338, lng: 111.6585 }}
            mapId={mapId}
          ></Map>
          <AdvancedMarker position={{ lat: 40.282299, lng: -111.643479 }}>
            <Pin
              background={"red"}
              borderColor={"white"}
              glyphColor={"white"}
            />
          </AdvancedMarker>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapPage;
