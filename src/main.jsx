import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import AccountInfoPage from "./Pages/AccountInfoPage.jsx";
import MapPage from "./Pages/MapPage.jsx";
import SavedTranslationsPage from "./Pages/SavedTranslationsPage.jsx";
import SavedTutorPage from "./Pages/SavedTutorPage.jsx";
import StudyPage from "./Pages/StudyPage.jsx";
import TranslatePage from "./Pages/TranslatePage.jsx";
import HomePage from "./Pages/HomePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="account" element={<AccountInfoPage />} />
      <Route path="map" element={<MapPage />} />
      <Route path="saved-translations" element={<SavedTranslationsPage />} />
      <Route path="saved-tutors" element={<SavedTutorPage />} />
      <Route path="study" element={<StudyPage />} />
      <Route path="translate" element={<TranslatePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
