import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TutorCard from "../Components/TutorCard.jsx";

const SavedTutorPage = () => {
  const [school, setSchool] = useState([]);

  const [deleter, setDeleter] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:2222/user-schools")
      .then((response) => {
        let results = response.data;
        console.log(results);
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
        // console.log(response)
      })
      .catch((error) => console.error("error fetching data:", error));
  }, [deleter]);

  return (
    <>
      <div>
        <Link to="/">Back to Home</Link>
        <div>{school}</div>
      </div>
    </>
  );
};

export default SavedTutorPage;
