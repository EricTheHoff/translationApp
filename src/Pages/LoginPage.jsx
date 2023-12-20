import axios from "axios";
import React from "react";
import Login from "../Components/Login.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();

  // Function to handle the login event. Passing this to the Login component as a property.
  const login = async (e, loginData) => {
    e.preventDefault();
    const response = await axios.post("/login", loginData);

    if (response.data.success) {
      const user = await axios.get("/user");
      dispatch({ type: "Logged In" });
      dispatch({ type: "Active User", payload: user.data.userId });
      window.location.href = "/";
    } else {
      toast.error(
        `Login Failed. Please ensure that you're entering a valid email and password.`
      );
    }
  };

  return (
    <>
      <Login login={login} />
    </>
  );
};

export default LoginPage;
