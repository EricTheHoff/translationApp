import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import toast from "react-hot-toast";
import { codeMapping, codes } from "../CountryCodes/countryCodes.js";
import '../Styles/bootstrapOverride.scss'
import '../Styles/translationPage.css'

const TranslatePage = () => {
  const [uploadPDF, setUploadPDF] = useState(false);
  const [uploadText, setUploadText] = useState(false);
  const [translation, setTranslation] = useState("");
  const [language, setLanguage] = useState("");
  const [newTranslation, setNewTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadPDF === true) {
      navigate("/pdf-upload");
      return;
    } else if (uploadText === true) {
      navigate("/text-upload");
      return;
    } else {
      toast.error(`Something went wrong. Please try again.`);
    }
  };

  const handleTranslation = async (e) => {
    e.preventDefault();

    const translationData = {
      translation,
      language,
      source: "EN",
    };

    await axios
      .post("/translate", translationData)

      .then(({ data }) => {
        console.log(data.translations[0]);
        setTranslatedText(data.translations[0].text);
        setNewTranslation(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveTranslation = async (e) => {
    e.preventDefault();

    console.log(language);

    const translationData = {
      translatedText: translatedText,
      originalText: translation,
      toLanguage: language,
    };

    await axios
      .post("/save-translation", translationData)
      .then(() => {
        toast.success(`Translation has been saved.`);
        setNewTranslation(false);
      })
      .catch((error) => {
        toast.error(`The following error has occurred: ${error}`);
      });
  };

//   if (newTranslation === false) {
    return (
      <>
        <Container fluid>
            <Row className='justify-content-center'>
                <Col lg={6}>
                    <Form
                        onSubmit={handleSubmit}
                        className='border p-3 mb-3 shadow text-center bkg-darker rounded'
                    >
                        <h4>Translate a File</h4>

                        <Row>
                            <Col className='mb-3'>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    onClick={() => setUploadText(true)}
                                    className='me-2'
                                >Text (.txt)
                                </Button>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    onClick={() => setUploadPDF(true)}
                                >PDF (.pdf)
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <Form
                        onSubmit={handleTranslation}
                        className='border p-3 shadow text-center bkg-darker rounded'
                    >
                        <h4>Quick Translate</h4>

                        <Row>
                            <Col>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Please enter a word or phrase to be translated.</Form.Label>
                                    <Form.Control
                                        className='txt-area'
                                        as='textarea'
                                        maxLength={500}
                                        placeholder='500 Character Limit'
                                        style={{
                                            backgroundColor: '#F5E0B2',
                                            borderColor: '#000'
                                        }}
                                        wrap='soft'
                                        onChange={(e) => setTranslation(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='align-items-end d-flex justify-content-center'>
                            <Col xs='auto'>
                                <Form.Group className='mb-3'>
                                    <Form.Select
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className='select'
                                    >
                                        <option value='' default>--Choose a Language--</option>
                                        {codes.map((el, idx) => {
                                            return (
                                                <option key={idx} value={el}>{codeMapping[el]}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs='auto'>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='mb-3'
                                >Translate
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col lg={6}>
                    <div className='border p-3 shadow text-center bkg-darker rounded' style={{ height: '100%' }}>
                        <h1>Welcome to [APP NAME]!</h1>
                        <hr/>
                        <p className='about'>Have you ever used a translating app only to find yourself searching for the same translation over and over again?
                            With [APP NAME], you can translate words and phrases from English to over 25 global languages and save those translations for further study!
                            By using [APP NAME], you can do the following:
                        </p>
                        <ul className='about-list'>
                            <li>
                                <p>Translate words or phrases through the
                                    <span className='about-bold'> Quick Translate </span>
                                    or
                                    <span className='about-bold'> Translate a File </span>
                                features!</p>
                            </li>
                            <li>
                                <p>Generate <a href='/study' className='about-bold'>customized flashcards</a> from your saved translations or from a sample pool of translations!</p>
                            </li>
                            <li>
                                <p>Find <a href='/map' className='about-bold'>local language schools</a> in your area!</p>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>

        <Modal show={newTranslation} onHide={() => setNewTranslation(false)} className='text-center'>
            <div className='border border-dark bkg-darker'>
                <Modal.Header closeButton className='border-bottom border-dark'>
                    <Modal.Title>Would you like to save this {
                        codes.filter((el) => el === language)
                        .map((el) => codeMapping[el] + ' ')
                    }  translation?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='bkg-lighter'>{translatedText}</Modal.Body>

                <Modal.Footer className='justify-content-center border-top border-dark'>
                    <Button variant='primary' onClick={(e) => {
                        saveTranslation(e)
                        setNewTranslation(false)
                    }}
                    >Yes
                    </Button>
                    <Button variant='primary' onClick={() => setNewTranslation(false)}>No</Button>
                </Modal.Footer>
            </div>
        </Modal>


        {/* <form onSubmit={handleSubmit}>
          <button type="submit" onClick={() => setUploadText(true)}>
            Text (.txt)
          </button>
          <button type="submit" onClick={() => setUploadPDF(true)}>
            PDF (.pdf)
          </button>
        </form>

        <br></br>

        <hr></hr>

        <br></br>

        <h3>Would you like to translate your own text?</h3>
        <h4>Please enter a word or phrase to be translated.</h4>

        <form onSubmit={handleTranslation}>
          <textarea
            style={{
              width: "85%",
              height: "200px",
              textAlign: "center",
            }}
            wrap="virtual"
            maxLength="500"
            placeholder="500 Character Limit"
            onChange={(e) => setTranslation(e.target.value)}
          />

          <br></br>

          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value='' selected>--Choose a Language--</option>
            {codes.map((el, idx) => {
                return (
                    <option key={idx} value={el}>{codeMapping[el]}</option>
                )
            })}
          </select>
          <button type="submit">Translate</button>
        </form> */}

      </>
    );
//   } else {
//     return (
//       <>
//         <Card style={{ width: "18rem", textAlign: "center" }}>
//           <Card.Header>Translation</Card.Header>
//           <Card.Body>
//             <Card.Title>{translatedText}</Card.Title>
//           </Card.Body>
//           <Card.Footer>
//             <form onSubmit={saveTranslation}>
//               <p>Would you like to save this to your translations?</p>
//               <button type="submit">Yes</button>
//               <button onClick={() => setNewTranslation(false)}>No</button>
//             </form>
//           </Card.Footer>
//         </Card>
//       </>
//     );
//   }
};

export default TranslatePage;
