import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const auth = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToExpress = () => {
    axios.get("/user-status")

    .then(async (response) => {
        if (!response.data.success) {
            dispatch({ type: "Logged Out" });
            dispatch({ type: "Inactive User" });
            dispatch({ type: "Inactive Zip" });
            navigate("/");
        } else {
            const user = await axios.get("/user");
            dispatch({ type: "Logged In" });
            dispatch({ type: "Active User", payload: user.data.userId });
            dispatch({ type: "Active Zip", payload: user.data.zipCode });
        }
    })
    .catch((error) => {
        console.error(`The following has occurred: ${error}`)
        dispatch({ type: "Logged Out" });
        dispatch({ type: "Inactive User" });
        dispatch({ type: "Inactive Zip" });
        navigate("/");
    })
  };

  useEffect(() => {
    saveToExpress();
  }, []);

  if (auth === true) {
    return (
      <div>
        <ul>
          <li>
            <Link to="/account">Account Info</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/translations">Saved Translations</Link>
          </li>
          <li>
            <Link to="/saved-tutors">Saved Tutors</Link>
          </li>
          <li>
            <Link to="/study">Study</Link>
          </li>
          <li>
            <Link to="/translate">Translate</Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          <li>
            <Link to="/register">Get Started</Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default HomePage;
