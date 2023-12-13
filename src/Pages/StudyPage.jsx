import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const StudyPage = () => {
  const [savedPhrases, setSavedPhrases] = useState([{ userId: 0, phrase: "" }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get("http://localhost:2222/savedPhrases");
        setSavedPhrases(results.data);
      } catch (error) {
        console.error("error fetching data", error);
        //
      }
    })();
  }, []);
  console.log(savedPhrases[currentIndex].phrase);
  const savePhrase = async (phrase) => {
    const response = await axios.post("http://localhost:2222/saveWord", {
      originalLanguage: "english",
      word: phrase.phrase,
      toLanguage: "Chinese",
    });
    console.log(response);
    if (response.status === 200) setCurrentIndex(currentIndex + 1);
  };
  const dispatch = useDispatch();
  dispatch({ type: "Logged In" });
  return (
    <div>
      <div>
        {savedPhrases[currentIndex].phrase}
        <button
          onClick={() => {
            savePhrase(savedPhrases[currentIndex]);
          }}
        >
          Save
        </button>
        {/* {savedPhrases.map((phrase, index) => {
            return <div key={index}>{phrase.phrase}</div>;
          })} */}
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default StudyPage;
