import React from "react";
import "../Styles/navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      console.log("success with logout");
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <nav>
        <a href="/">translationApp</a>
        <a href="/map">Map</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/account">Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
