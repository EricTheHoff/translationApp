import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm";

const RegisterPage = () => {
  return (
    <div>
      <RegistrationForm />
      <Link to="/login">Return to Login</Link>
    </div>
  );
};

export default RegisterPage;
