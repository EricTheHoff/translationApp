import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Places from "./Pages/PlacesPage";
function App() {
  return (
    <>
      <Places />
      {/* <Outlet /> */}
    </>
  );
}

export default App;
