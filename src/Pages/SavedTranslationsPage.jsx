import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios'
import SavedWord from "../Components/SavedWord";

const SavedTranslationsPage = () => {

  const [savedWords, setSavedWords] = useState([])

useEffect(() => {
  axios
  .get("http://localhost:2222/allSavedWords")
  .then((response) => {
    setSavedWords(response.data)
  })
  .catch((error) => console.error("error fetching data:", error));
  }, [])

  console.log(savedWords)

  return (
    <div>
      <Link to="/">Back to Home</Link>
      {savedWords.map((word) => (<SavedWord word={word}/>))}
    </div>
  );
};

export default SavedTranslationsPage;
