import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import MapPage from "./Pages/MapPage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RegisterPage from "./Pages/RegisterPage";
import { useState } from "react";
import React from "react";

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      {/* <Outlet /> */}
    </>
  );
}

export default App;
