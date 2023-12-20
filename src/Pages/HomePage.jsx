import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import TranslatePage from "./TranslatePage";
import LoginPage from "./LoginPage";

const HomePage = () => {
  const auth = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to check if a session exists in Express.
  const saveToExpress = () => {
    axios
      .get("/user-status")

      .then(async (response) => {
        if (!response.data.success) {
          dispatch({ type: "Logged Out" });
          navigate("/login");
        } else {
          await axios.get("/user");
          dispatch({ type: "Logged In" });
        }
      })
      .catch((error) => {
        console.error(`The following has occurred: ${error}`);
        dispatch({ type: "Logged Out" });
        navigate("/login");
      });
  };

  useEffect(() => {
    saveToExpress();
  }, []);

  if (auth === true) {
    return (
      <>
        <TranslatePage />
      </>
    );
  } else {
    return (
      <>
        <LoginPage />
      </>
    );
  }
};

export default HomePage;
