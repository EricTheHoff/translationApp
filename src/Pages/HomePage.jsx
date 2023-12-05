import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/account">Account Info</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/saved-translations">Saved Translations</Link>
        </li>
        <li>
          <Link to="/saved-tutors">Saved Tutors</Link>
        </li>
        <li>
          <Link to="/study">Study</Link>
        </li>
        <li>
          <Link to="/translate">Translate</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
