import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar"

import MapPage from "./Pages/MapPage";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Outlet /> */}
    </>
  )
}

export default App;
