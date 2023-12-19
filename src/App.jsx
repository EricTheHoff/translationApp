import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import React from "react";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
