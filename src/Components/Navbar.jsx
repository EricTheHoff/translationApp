import React from "react";
import "../Styles/navbar.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../Styles/profile.css";
import user from "../Images/Avatars/user.png";

const Navbar = () => {
  const auth = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.userId);

  console.log(id);

  const saveToExpress = async () => {
    const response = await axios.get("/user-status");

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
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      console.log("success with logout");
      navigate("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    saveToExpress();
  }, []);

  if (auth === true) {
    return (
      <div className="navbar">
        <nav>
          <a href="/">translationApp</a>
          <a href="/map">Map</a>

          <div className="dropdown">
            <a href="/account">
              <img className="navImage" src={user}></img>
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
