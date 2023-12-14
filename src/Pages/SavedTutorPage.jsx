import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TutorCard from "../Components/TutorCard.jsx";

const SavedTutorPage = () => {
  const [tutor, setTutor] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2222/user-schools")
      .then((response) => {
        // setTutorState(response.data)
        let results = response.data;
        console.log(results);
        // console.log(tutorState)
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
            />
          );
        });
        setTutor(mapResults);
        // console.log(response)
      })
      .catch((error) => console.error("error fetching data:", error));
  }, []);
  return (
    <>
      <div>
        <Link to="/">Back to Home</Link>
        <div>{tutor}</div>
      </div>
    </>
  );
};

export default SavedTutorPage;
