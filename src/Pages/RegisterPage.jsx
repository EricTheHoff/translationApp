import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm";

const RegisterPage = () => {
  return (
    <div>
      <APIProvider apiKey={apiKey}>
        <div style={{ height: "100vh" }}>
          <Map zoom={3} center={{ lat: 22.54992, lng: 0 }} mapId={mapId}></Map>
        </div>
      </APIProvider>

      <RegistrationForm />

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default RegisterPage;
