import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from './Flashcard.jsx'
import toast from 'react-hot-toast'
import { codes, codeMapping } from '../CountryCodes/countryCodes.js'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const StudySeed = () => {
    const [flashcards, setFlashcards] = useState([])
    const [language, setLanguage] = useState('')
    const [englishFront, setEnglishFront] = useState(false)
    const [noOfCards, setNoOfCards] = useState(1)
    const [difficulty, setDifficulty] = useState('')
    const [display, setDisplay] = useState(false)
    const [flashcardData, setFlashcardData] = useState([])
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setDisplay(true)
    }

    useEffect(() => {
        const postData = { difficulty: difficulty }
        axios.post('/seed-translations', postData)

        .then((response) => {
            setFlashcards(response.data)
        })
        .catch((error) => {
            console.log(`The following error has occurred: ${error}`)
        })
    },[difficulty])


    useEffect(() => {
        if (language !== '') {
            if (noOfCards > flashcards.length) {
                return
            } else {
                setLoading(true)

                let result = []
                let translationPromises = []

                for (let i = 0; i < noOfCards; i++) {
                    let randomIndex = Math.floor(Math.random() * flashcards.length)
                    if (result.includes(flashcards[randomIndex])) {
                        i--
                    } else {
                        result.push(flashcards[randomIndex])
                        const translationData = {
                            translation: flashcards[randomIndex].phrase,
                            language,
                            source: 'EN',
                        }

                        const translationPromise = axios.post('/translate', translationData)

                            .then((response) => {
                                const translations = response.data.translations
                                let flashcardObj = {
                                    wordId: flashcards[randomIndex].phraseId,
                                    word: translations[0].text,
                                    original: flashcards[randomIndex].phrase,
                                }
                                return flashcardObj
                            })
                            .catch((error) => {
                                console.error(`The following error has occurred: ${error}`)
                                return null
                            })
                        translationPromises.push(translationPromise)
                    }
                }

                Promise.all(translationPromises)
                    .then((translatedFlashcards) => {
                        const filteredFlashcards = translatedFlashcards.filter((el) => el !== null)

                        setFlashcardData(filteredFlashcards)
                        setLoading(false)

                        toast.success(`Ready to study!`)
                    })
                    .catch((error) => {
                        console.log(`Error in Promise.all: ${error}`)
                        toast.error(`Something went wrong. No Flashcards generated.`)
                        setLoading(false)
                    })
            }
        } else {
            return
        }
    },[language])

    
    if (display === false) {
        return (
            <>
                {loading ? (
                    <>
                        <Container fluid>
                            <Row className='text-center mb-3'>
                                <h3>Generate Flashcards from Sample Translations</h3>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col xs='auto' lg={8}>
                                    <Form className='border p-3 bkg-darker shadow rounded' onSubmit={(e) => handleSubmit(e)}>
                                        <Row className='mb-3 justify-content-center'>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Number of Flashcards</Form.Label>
                                                    <Form.Control
                                                        className='select'
                                                        type='number'
                                                        min='1'
                                                        max='50'
                                                        step='1'
                                                        placeholder='--Max of 50--'
                                                        pattern='[1-9]|[1-4][0-9]|50'
                                                        onChange={(e) => setNoOfCards(e.target.value)}
                                                        style={{
                                                            backgroundColor: '#F5E0B2',
                                                            borderColor: '#000',
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Difficulty</Form.Label>
                                                    <Form.Select onChange={(e) => setDifficulty(e.target.value)} className='select'>
                                                        <option selected>--Difficulty--</option>
                                                        <option value='1'>Easy</option>
                                                        <option value='2'>Medium</option>
                                                        <option value='3'>Hard</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3 justify-content-center'>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Configuration</Form.Label>
                                                    <Form.Select onChange={(e) => setEnglishFront(e.target.value)} className='select'>
                                                        <option selected>--Configuration--</option>
                                                        <option value={false}>English on the Back</option>
                                                        <option value={true}>English on the Front</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Language</Form.Label>
                                                    <Form.Select onChange={(e) => setLanguage(e.target.value)} className='select'>
                                                        <option value='' selected>--Language--</option>
                                                        {codes.map((el, idx) => {
                                                            return (
                                                            <option key={idx} value={el}>{codeMapping[el]}</option>
                                                        )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className='mb-1'>
                                            <Col className='text-center'>
                                                <p>Loading...</p>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className='text-center mt-2'>
                                <Link to='/study'>Back to Study</Link>
                            </Row>
                        </Container>
                        {/* <h3>Generate Flashcards from Sample Translations</h3>
                        <form>
            
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
                                <option value='' selected>--Choose a Language--</option>
                                {codes.map((el, idx) => {
                                    return (
                                        <option key={idx} value={el}>{codeMapping[el]}</option>
                                    )
                                })}
                            </select>
            
                        <br/>
            
                            <p>Loading flashcards...</p>
            
                        </form>
            
                        <Link to='/study'>Back to Study</Link> */}
                    </>
                ) : (
                    <>
                        <Container fluid>
                            <Row className='text-center mb-3'>
                                <h3>Generate Flashcards from Sample Translations</h3>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col xs='auto' lg={8}>
                                    <Form className='border p-3 bkg-darker shadow rounded' onSubmit={(e) => handleSubmit(e)}>
                                        <Row className='mb-3 justify-content-center'>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Number of Flashcards</Form.Label>
                                                    <Form.Control
                                                        className='select'
                                                        type='number'
                                                        min='1'
                                                        max='50'
                                                        step='1'
                                                        placeholder='--Max of 50--'
                                                        pattern='[1-9]|[1-4][0-9]|50'
                                                        onChange={(e) => setNoOfCards(e.target.value)}
                                                        style={{
                                                            backgroundColor: '#F5E0B2',
                                                            borderColor: '#000',
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Difficulty</Form.Label>
                                                    <Form.Select onChange={(e) => setDifficulty(e.target.value)} className='select'>
                                                        <option selected>--Difficulty--</option>
                                                        <option value='1'>Easy</option>
                                                        <option value='2'>Medium</option>
                                                        <option value='3'>Hard</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3 justify-content-center'>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Configuration</Form.Label>
                                                    <Form.Select onChange={(e) => setEnglishFront(e.target.value)} className='select'>
                                                        <option selected>--Configuration--</option>
                                                        <option value={false}>English on the Back</option>
                                                        <option value={true}>English on the Front</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Choose Language</Form.Label>
                                                    <Form.Select onChange={(e) => setLanguage(e.target.value)} className='select'>
                                                        <option value='' selected>--Language--</option>
                                                        {codes.map((el, idx) => {
                                                            return (
                                                            <option key={idx} value={el}>{codeMapping[el]}</option>
                                                        )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className='mb-1'>
                                            <Col className='text-center'>
                                                <Button type='submit' variant='primary'>Study</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className='text-center mt-2'>
                                <Link to='/study'>Back to Study</Link>
                            </Row>
                        </Container>
                        {/* <h3>Generate Flashcards from Sample Translations</h3>
                        <form onSubmit={(e) => handleSubmit(e)}>
            
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
                                <option value='' selected>--Choose a Language--</option>
                                {codes.map((el, idx) => {
                                    return (
                                        <option key={idx} value={el}>{codeMapping[el]}</option>
                                    )
                                })}
                            </select>
            
                        <br/>
            
                            <button type='submit'>Study</button>
            
                        </form> */}
            
                    </>
                )} 
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <div className='card-grid'>
                        {flashcardData.map((el) => {
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
                <button onClick={() => {
                    setLanguage('')
                    setFlashcardData([])
                    setDisplay(false)
                    }}
                    >Study Another Language</button>
            </>
        )
    }
}

export default StudySeed