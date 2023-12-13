import React from "react";
import { useEffect, useState  } from "react";
import axios from "axios";
import Flashcard from "../Components/Flashcard.jsx";
import StudyList from "../Components/StudyList.jsx";

const StudyPage = () => {
  const [flashcards, setFlashcards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  const [filteredNo, setFilteredNo] = useState([])
  const [language, setLanguage] = useState('')
  const [englishFront, setEnglishFront] = useState(false)
  const [noOfCards, setNoOfCards] = useState(1)
  const [display, setDisplay] = useState(false)

  const handleSubmit = (e, number) => {
    e.preventDefault()

    let result = []
    for (let i = 0; i < number; i++) {
        let randomIndex = Math.floor(Math.random() * filteredCards.length)
        if (result.includes(filteredCards[randomIndex])) {
            i--
        } else {
            result.push(filteredCards[randomIndex])
        }
    }
    setFilteredNo(result)
    setDisplay(true)
  }

  useEffect(() => {
    axios.get(`/saved-translations`)

    .then((response) => {
        setFlashcards(response.data)
    })
    .catch((error) => {
        console.log(`The following error has occurred: ${error}`)
    })
  },[])

  useEffect(() => {
    const filteredResults = flashcards.filter((el) => el.toLanguage === language)
    setFilteredCards(filteredResults)
  },[language])





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

    if (display === false) {
        return (
            <>
                <div>TESTING - PLEASE IGNORE</div>

                <form onSubmit={(e) => handleSubmit(e, noOfCards)}>

                    <label htmlFor='english-front'>Choose Flashcard Configuration: </label>
                    <select name='english-front' onChange={(e) => setEnglishFront(e.target.value)}>
                        <option selected disabled>--Choose a Configuration--</option>
                        <option value={false}>English Text on the Back</option>
                        <option value={true}>English Text on the Front</option>
                    </select>
        
                    <br/>

                    <label htmlFor='quantity'>Number of Flashcards: </label>
                    <input type='number' name='quantity' onChange={(e) => setNoOfCards(e.target.value)}/>

                    <br/>

                    <label htmlFor='language'>Choose a Language: </label>
                    <select name='language' onChange={(e) => setLanguage(e.target.value)}>
                        <option value='' selected disabled>--Choose a Language--</option>
                        <option value='NB'>Norwegian (Bokmål)</option>
                        <option value='ZH'>Chinese</option>
                    </select>

                    <br/>

                    <button type='submit'>Study</button>

                </form>

                {/* <div>
                    {flashcards.map((el) => {
                        return (
                            <Flashcard
                            key={el.wordId}
                            flashcard={el}
                            />
                        )
                    })}
                </div> */}
            </>
        )
    } else {
        return (
            <>
                {/* <StudyList
                flashcards={filteredCards}
                configuration={englishFront}
                /> */}
                <div className='card-grid'>
                    {filteredNo.map((el) => {
                            return (
                                <Flashcard
                                key={el.wordId}
                                flashcard={el}
                                configuration={englishFront}
                                />
                            )
                        })}
                </div>
                <button onClick={() => setDisplay(false)}>Study Another Language</button>
            </>
        )
    }
}

export default StudyPage;
