import React from "react";
import "../Styles/navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import "../Styles/images.css";

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

  const [navImage, setNavImage] = useState(user);

  const saveToExpress = () => {
    axios.get("/user-status")

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

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/logout");
    if (res.data.success) {
      navigate("/login");
      window.location.reload();
    }
  };

  const getAccount = () => {
    axios.get("/user")

      .then((response) => {
        setNavImage(response.data.profilePic);
      })

      .catch((error) => {
        return;
      });
  };

  useEffect(() => {
    saveToExpress();
    getAccount();
  }, []);

  if (auth === true) {
    return (
      <div className="navbar">
        <div className="mobile-dropdown">
          <a className="navHome" href="/">
            BabelBuddy
          </a>

          <a className="bigScreenLink" href="/translate">
            Translate
          </a>
          <a className="bigScreenLink" href="/study">
            Study
          </a>
          <a className="bigScreenLink" href="/map">
            Find&nbsp;a&nbsp;School
          </a>

          <div className="mobile-dropdown-content">
            <nav id="navTag">
              <form className="navForm" action="/translate">
                <button className="profileLink" id="translateLink">
                  Translate
                </button>
              </form>

              <form className="navForm" action="/study">
                <button className="profileLink" id="studyLink">
                  Study
                </button>
              </form>

              <form className="navForm" action="/map">
                <button className="profileLink" id="mapLink">
                  Find&nbsp;a&nbsp;School
                </button>
              </form>
            </nav>
          </div>
        </div>

        <div className="dropdown">
          <a href="/account">
            <img
              className="navImage"
              src={imageFiles[navImage] ? imageFiles[navImage] : navImage}
            ></img>
          </a>
          <div className="dropdown-content">
            <form className="navForm" action="/account">
              <button className="profileLink" id="pLink">
                Profile
              </button>
            </form>

            <form className="navForm" action="/translations">
              <button className="profileLink" id="sLink">
                Saved&nbsp;Translations
              </button>
            </form>

            <form className="navForm" action="/saved-tutors">
              <button className="profileLink" id="tLink">
                Saved&nbsp;Schools
              </button>
            </form>

            <hr className="hrColor" />
            <button id="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Navbar;
