import React from "react";
import { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import toast from "react-hot-toast";

const StudyPage = () => {
  const [studySaved, setStudySaved] = useState(false)
  const [studySeed, setStudySeed] = useState(false)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    if (studySaved === true) {
        navigate('/study-saved')
        return
    } else if (studySeed === true) {
        navigate('/study-seed')
        return
    } else {
        toast.error(`Something went wrong. Please try again.`)
    }
  }

    return (
        <>
            <Container fluid>
                <Row className='text-center mb-3 mt-3 light-title'>
                    <Col>
                        <h3>Study Translations</h3>
                        <h4>Choose your Study Pool</h4>
                    </Col>
                </Row>
                <Row className='text-center justify-content-center'>
                    <Col xs='auto' lg={5}>
                        <form onSubmit={submit}>
                            <div className='border pt-3 pb-3 bkg-darker shadow rounded mb-3'>
                                <h4>My Saved Translations</h4>
                                <hr/>
                                <div className='js-text px-3'>
                                    <p>Create flashcards generated from your saved translations. This will pull from any translations that you've saved through
                                        the <a href='/translate' className='about-bold'>Quick Translate</a> or <a href='/translate' className='about-bold'>Translate a File</a> features.
                                        Good luck with your studying!
                                    </p>
                                </div>
                                <hr/>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='ibtn'
                                    onClick={() => setStudySaved(true)}
                                >My Saved Translations
                                </Button>
                            </div>  
                        </form>
                    </Col>
                    <Col xs='auto' lg={5}>
                        <form onSubmit={submit}>
                            <div className='border pt-3 pb-3 bkg-darker shadow rounded mb-3'>
                                <h4>Sample Translations</h4>
                                <hr/>
                                <div className='js-text px-3'>
                                    <p>Create flashcards generated from pre-existing sample phrases. You can choose to create flashcards using easy, medium, or hard phrases.
                                        This is an excellent option for users who haven't saved any translations yet.
                                    </p>
                                </div>
                                <hr/>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='ibtn'
                                    onClick={() => setStudySeed(true)}
                                >Sample Translations
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Link to='/' className='light-title'>Back to Home</Link>
                </Row>
            </Container>
        </>
    )
}

export default StudyPage;
