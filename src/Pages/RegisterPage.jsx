import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm";

const RegisterPage = () => {
  return (
    <div>
      <RegistrationForm />

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default RegisterPage;
