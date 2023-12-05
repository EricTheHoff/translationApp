import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "100vh" }}>
        <Map zoom={3} center={{ lat: 22.54992, lng: 0 }} mapId={mapId}></Map>
      </div>
    </APIProvider>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default RegisterPage;
