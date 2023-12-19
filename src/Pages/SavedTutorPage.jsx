import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TutorCard from "../Components/TutorCard.jsx";
import "../Styles/savedtutor.css";

const SavedTutorPage = () => {
  const [school, setSchool] = useState([]);
  const [deleter, setDeleter] = useState(false);
  const hasSavedTutors = school.length > 0;

  useEffect(() => {
    axios
      .get("http://localhost:2222/user-schools")
      .then((response) => {
        let results = response.data;
        if (results.schoolDetails.length > 0) {
          let mapResults = results.schoolDetails.map((el) => {
            const { name, address, rating, schoolId, website } = el;
            return (
              <TutorCard
                key={schoolId}
                name={name}
                rating={rating}
                address={address}
                website={website}
                id={schoolId}
                setDeleter={setDeleter}
                deleter={deleter}
              />
            );
          });
          setSchool(mapResults);
        } else {
          setSchool(
            <h1 className="no-tutor">
              You don't have any schools saved <br></br>{" "}
              <Link to="/map" className="find-schools-link">
                Find Schools
              </Link>
            </h1>
          );
        }
      })
      .catch((error) => console.error("error fetching data:", error));
  }, [deleter]);

  return (
    <>
      <Link to="/">Back to Home</Link>

      <div className={hasSavedTutors ? "tutorContainer" : "no-tutor-container"}>
        {school}
      </div>
    </>
  );
};

export default SavedTutorPage;
