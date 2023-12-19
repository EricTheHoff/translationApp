import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Flashcard from './Flashcard.jsx'
import { codeMapping } from '../CountryCodes/countryCodes.js'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'

const StudySaved = () => {
    const [flashcards, setFlashcards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [filteredNo, setFilteredNo] = useState([])
    const [language, setLanguage] = useState('')
    const [englishFront, setEnglishFront] = useState(false)
    const [noOfCards, setNoOfCards] = useState(1)
    const [display, setDisplay] = useState(false)
    const uniqueToLanguages = [...new Set(flashcards.map((el) => el.toLanguage))]

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
            console.error(`The following error has occurred: ${error}`)
            toast.error(`An error occurred while trying to get your Saved Translations. Please try again.`)
        })
    },[])


    useEffect(() => {
        const filteredResults = flashcards.filter((el) => el.toLanguage === language)
        setFilteredCards(filteredResults)
    },[language])
    

    if (display === false) {
        return (
            <>
                <Container fluid>
                    <Row className='text-center mb-3'>
                        <h3>Generate Flashcards from Saved Translations</h3>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs='auto' lg={8}>
                            <Form className='border p-3 bkg-darker shadow rounded' onSubmit={(e) => handleSubmit(e, noOfCards)}>
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
                                            <Form.Label>Choose Configuration</Form.Label>
                                            <Form.Select onChange={(e) => setEnglishFront(e.target.value)} className='select'>
                                                <option>--Configuration--</option>
                                                <option value={false}>English on the Back</option>
                                                <option value={true}>English on the Front</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='mb-3 justify-content-center'>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Choose Language</Form.Label>
                                            <Form.Select onChange={(e) => setLanguage(e.target.value)} className='select'>
                                                <option value=''>--Language--</option>
                                                {uniqueToLanguages.map((el, idx) => {
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
            </>
        )
    } else {
        return (
            <>
                <Container fluid>
                    <Row className='justify-content-center mb-2'>
                        <div className='containers'>
                            <div className='card-grid border p-3 bkg-lighter shadow rounded'>
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
                    </Row>
                    <Row className='text-center justify-content-center mb-3'>
                        <Col xs='auto' lg={4}>
                            <Button variant='primary' onClick={() => setDisplay(false)}>Generate New Flashcards</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default StudySaved