import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import MapPage from "./Pages/MapPage";

function App() {
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
