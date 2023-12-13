import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from './Flashcard.jsx'

const StudySeed = () => {
    const [flashcards, setFlashcards] = useState([])
    const [filteredNo, setFilteredNo] = useState([])
    const [language, setLanguage] = useState('')
    const [englishFront, setEnglishFront] = useState(false)
    const [noOfCards, setNoOfCards] = useState(1)
    const [difficulty, setDifficulty] = useState('')
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        const postData = { difficulty: difficulty }
        axios.post('/seed-translations', postData)

        .then((response) => {
            console.log(response.data)
            setFlashcards(response.data)
        })
        .catch((error) => {
            console.log(`The following error has occurred: ${error}`)
        })
    },[difficulty])

    const handleSubmit = (e, number) => {
        e.preventDefault()

        let result = []
        for (let i = 0; i < number; i++) {
            let randomIndex = Math.floor(Math.random() * flashcards.length)
            if (result.includes(flashcards[randomIndex])) {
                i--
            } else {
                result.push(flashcards[randomIndex])
            }
            let translatedResults = result.map((el) => {
                const translationData = {
                    translation: el.phrase,
                    language,
                    source: "EN",
                  };

                axios.post('/translate', translationData)

                .then((response) => {
                    const translations = response.data.translations
                    console.log(translations[0].text)
                })
                .catch((error) => {
                    console.log(`The following error has occurred: ${error}`)
                })
            })
            setFilteredNo(translatedResults)
            setDisplay(true)
        }
    }
    
    if (display === false) {
        return (
            <>
                <h3>Generate Flashcards from Sample Translations</h3>
                <form onSubmit={(e) => handleSubmit(e, noOfCards)}>
    
                    <label htmlFor='quantity'>Number of Flashcards: </label>
                    <input
                    type='number'
                    name='quantity'
                    min='1'
                    max='50'
                    step='1'
                    placeholder='Maximum of 50'
                    pattern='[1-9]|[1-4][0-9]|50'
                    onChange={(e) => setNoOfCards(e.target.value)}
                    />
    
                <br/>
                    
                    <label htmlFor='difficulty'>Choose Sample Difficulty: </label>
                    <select name='difficulty' onChange={(e) => setDifficulty(e.target.value)}>
                        <option selected disabled>--Choose a Difficulty--</option>
                        <option value='1'>Easy</option>
                        <option value='2'>Medium</option>
                        <option value='3'>Hard</option>
                    </select>
    
                <br/>
    
                    <label htmlFor='english-front'>Choose Flashcard Configuration: </label>
                    <select name='english-front' onChange={(e) => setEnglishFront(e.target.value)}>
                        <option selected disabled>--Choose a Configuration--</option>
                        <option value={false}>English Text on the Back</option>
                        <option value={true}>English Text on the Front</option>
                    </select>
    
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
    
                <Link to='/study'>Back to Study</Link>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <div className='card-grid'>
                        {/* {filteredNo.map((el) => {
                        return (
                            <Flashcard
                            key={el.phraseId}
                            flashcard={el}
                            configuration={englishFront}
                            /> */}
                            <>
                                <p>Translation</p>
                            </>
                        {/* )
                        })} */}
                    </div>
                </div>
                <button onClick={() => setDisplay(false)}>Study Another Language</button>
            </>
        )
    }
}

export default StudySeed