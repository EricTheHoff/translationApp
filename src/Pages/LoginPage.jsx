import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import Login from "../Components/Login.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (e, loginData) => {
    e.preventDefault();
    const response = await axios.post("/login", loginData);

    if (response.data.success) {
      const user = await axios.get("/user");
      dispatch({ type: "Logged In" });
      dispatch({ type: "Active User", payload: user.data.userId });
      dispatch({ type: "Active Zip", payload: user.data.zipCode });
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
