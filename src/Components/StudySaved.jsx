import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from './Flashcard.jsx'

const StudySaved = () => {
    const [flashcards, setFlashcards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [filteredNo, setFilteredNo] = useState([])
    const [language, setLanguage] = useState('')
    const [englishFront, setEnglishFront] = useState(false)
    const [noOfCards, setNoOfCards] = useState(1)
    const [display, setDisplay] = useState(false)
    
    const uniqueToLanguages = [...new Set(flashcards.map((el) => el.toLanguage))]
    const codeMapping = {
        'CS': 'Czech',
        'DA': 'Danish',
        'DE': 'German',
        'EL': 'Greek',
        'ES': 'Spanish',
        'ET': 'Estonian',
        'FI': 'Finnish',
        'FR': 'French',
        'HU': 'Hungarian',
        'ID': 'Indonesian',
        'IT': 'Italian',
        'JA': 'Japanese',
        'KO': 'Korean',
        'LT': 'Lithuanian',
        'LV': 'Latvian',
        'NB': 'Norwegian (Bokmål)',
        'NL': 'Dutch',
        'PL': 'Polish',
        'PT': 'Portuguese',
        'RO': 'Romanian',
        'RU': 'Russian',
        'SK': 'Slovak',
        'SL': 'Slovenian',
        'SV': 'Swedish',
        'TR': 'Turkish',
        'UK': 'Ukranian',
        'ZH': 'Chinese',
    }


    const handleSubmit = (e, number) => {
        e.preventDefault()
    
        if (number >= filteredCards.length) {
            let arr = filteredCards
            setFilteredNo(arr)
            setDisplay(true)
            return
        } else {
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

    if (display === false) {
        return (
            <>
                <h3>Generate Flashcards from My Saved Translations</h3>
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
                        {uniqueToLanguages.map((language, idx) => {
                            return (
                                <option key={idx} value={language}>{codeMapping[language]}</option>
                            )
                        })}
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
                </div>
                <button onClick={() => setDisplay(false)}>Study Another Language</button>
            </>
        )
    }
}

export default StudySaved