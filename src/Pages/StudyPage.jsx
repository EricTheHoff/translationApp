import React from "react";
import StudyList from "../Components/StudyList.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState  } from "react";
import axios from "axios";
import Flashcard from "../Components/Flashcard.jsx";

const StudyPage = () => {
  const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    axios.get(`/saved-translations`)

    .then((response) => {
        setFlashcards(response.data)
    })
    .catch((error) => {
        console.log(`The following error has occurred: ${error}`)
    })
  },[])

//   useEffect(() => {
//     console.log(flashcards)
//   },[flashcards])

//   useEffect(() => {
//     let mapResults = flashcards.map((el) => {
//         const { wordId, word, original, toLanguage } = el

//         return (
//             <Flashcard
//             key={wordId}
//             translatedPhrase={word}
//             englishPhrase={original}
//             toLanguage={toLanguage}
//             />
//         )
//     })
//     setCollection(mapResults)
//   },[])




//   useEffect(() => {
//     (async () => {
//       try {
//         const results = await axios.get("http://localhost:2222/savedPhrases");
//         console.log(results);
//         setSavedPhrases(results.data);
//       } catch (error) {
//         console.error("error fetching data", error);
//         //
//       }
//     })();
//   }, []);
//   console.log(savedPhrases[currentIndex].phrase);
//   const savePhrase = async (phrase) => {
//     const response = await axios.post("http://localhost:2222/saveWord", {
//       originalLanguage: "english",
//       word: phrase.phrase,
//       toLanguage: "Chinese",
//     });
//     console.log(response);
//     if (response.status === 200) setCurrentIndex(currentIndex + 1);
//   };
//   const dispatch = useDispatch();
//   dispatch({ type: "Logged In" });
//   return (
//     <div>
//       <div>
//         {savedPhrases[currentIndex].phrase}
//         <button
//           onClick={() => {
//             savePhrase(savedPhrases[currentIndex]);
//           }}
//         >
//           Save
//         </button>
//         {/* {savedPhrases.map((phrase, index) => {
//             return <div key={index}>{phrase.phrase}</div>;
//           })} */}
//       </div>
//       <Link to="/">Back to Home</Link>
//     </div>
//   );

    return (
        <>
            <div>TESTING - PLEASE IGNORE</div>

            <div>
                {flashcards.map((el) => {
                    return (
                        <Flashcard
                        key={el.wordId}
                        flashcard={el}
                        />
                    )
                })}
            </div>
            {/* <StudyList
            flashcards={flashcards}
            /> */}
        </>
    )
}

export default StudyPage;
