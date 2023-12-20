import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import AccountInfoPage from "./Pages/AccountInfoPage.jsx";
import MapPage from "./Pages/MapPage.jsx";
import SavedTranslationsPage from "./Pages/SavedTranslationsPage.jsx";
import SavedTutorPage from "./Pages/SavedTutorPage.jsx";
import StudyPage from "./Pages/StudyPage.jsx";
import TranslatePage from "./Pages/TranslatePage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import PDFUpload from "./Components/PDFUpload.jsx";
import TextUpload from "./Components/TextUpload.jsx";
import StudySaved from "./Components/StudySaved.jsx";
import StudySeed from "./Components/StudySeed.jsx";
import RegistrationForm from "./Components/RegistrationForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route path="account" element={<AccountInfoPage />} />
      <Route path="map" element={<MapPage />} />
      <Route path="translations" element={<SavedTranslationsPage />} />
      <Route path="saved-tutors" element={<SavedTutorPage />} />
      <Route path="study" element={<StudyPage />} />
      <Route path="translate" element={<TranslatePage />} />
      <Route path="pdf-upload" element={<PDFUpload />} />
      <Route path="text-upload" element={<TextUpload />} />
      <Route path="study-saved" element={<StudySaved />} />
      <Route path="study-seed" element={<StudySeed />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
