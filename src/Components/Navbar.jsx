import React from "react";
import "../Styles/navbar.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../Styles/profile.css";
import user from "../Images/Avatars/user.png";
import bear from "../Images/Avatars/bear.png";
import cat from "../Images/Avatars/cat.png";
import chicken from "../Images/Avatars/chicken.png";
import dog from "../Images/Avatars/dog.png";
import koala from "../Images/Avatars/koala.png";
import meerkat from "../Images/Avatars/meerkat.png";
import panda from "../Images/Avatars/panda.png";
import rabbit from "../Images/Avatars/rabbit.png";
import sealion from "../Images/Avatars/sealion.png";
const imageFiles = {
  user,
  bear,
  cat,
  chicken,
  dog,
  koala,
  meerkat,
  panda,
  rabbit,
  sealion,
};

const Navbar = () => {
  const auth = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.userId);

  const [navImage, setNavImage] = useState(user);

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

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/logout");
    if (res.data.success) {
      console.log("success with logout");
      navigate("/login");
      window.location.reload();
    }
  };

  const getAccount = () => {
    axios.get('/user')

    .then((response) => {
        setNavImage(response.data.profilePic)
    })

    .catch((error) => {
        return
    })
  }

  useEffect(() => {
    saveToExpress();
    getAccount();
  }, []);

  if (auth === true) {
    return (
      <div className="navbar">
        <nav>
          <a href="/">translationApp</a>
          <a href="/map">Map</a>

          <div className="dropdown">
            <a href="/account">
              <img
                className="navImage"
                src={imageFiles[navImage] ? imageFiles[navImage] : navImage}
              ></img>
            </a>
            <div className="dropdown-content">
              <a href="/account">Profile</a>
              <br />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default Navbar;
