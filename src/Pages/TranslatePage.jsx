import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
// import PDFUpload from "../Components/PDFUpload.jsx";
import axios from 'axios'

const TranslatePage = () => {
    const [uploadPDF, setUploadPDF] = useState(false)
    const [uploadText, setUploadText] = useState(false)
    const [translation, setTranslation] = useState('')
    const [language, setLanguage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (uploadPDF === true) {
            navigate('/pdf-upload')
            return
        } else if (uploadText === true) {
            navigate('/text-upload')
            return
        } else {
            alert(`Something went wrong. Please try again.`)
        }
    }

    const handleTranslation = async (e) => {
        e.preventDefault()

        const translationData = {
            translation,
            language
        }

        await axios.post('/translate', translationData)

        .then(({data}) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <h3>Would you like to translate a file?</h3>
            <h4>Please select a file to upload.</h4>

            <form onSubmit={handleSubmit}>
                <button type='submit' onClick={() => setUploadText(true)}>Text (.txt)</button>
                <button type='submit' onClick={() => setUploadPDF(true)}>PDF (.pdf)</button>
            </form>

            <br></br>

            <hr></hr>

            <br></br>

            <h3>Would you like to translate your own text?</h3>
            <h4>Please enter a word or phrase to be translated.</h4>

            <form onSubmit={handleTranslation}>
                <input
                style={{
                    width: '85%',
                    height: '200px',
                    textAlign: 'center'
                }}
                type='textarea'
                maxLength='2000'
                placeholder='2000 Character Limit'
                onChange={(e) => setTranslation(e.target.value)}
                />

                <select onChange={(e) => setLanguage(e.target.value)}>
                    <option selected default disabled>--Choose a Language--</option>
                    <option value='BG'>Bulgarian</option>
                    <option value='CS'>Czech</option>
                    <option value='DA'>Danish</option>
                    <option value='DE'>German</option>
                    <option value='EL'>Greek</option>
                    <option value='ES'>Spanish</option>
                    <option value='ET'>Estonian</option>
                    <option value='FI'>Finnish</option>
                    <option value='FR'>French</option>
                    <option value='HU'>Hungarian</option>
                    <option value='ID'>Indonesian</option>
                    <option value='IT'>Italian</option>
                    <option value='JA'>Japanese</option>
                    <option value='KO'>Korean</option>
                    <option value='LT'>Lithuanian</option>
                    <option value='LV'>Latvian</option>
                    <option value='NB'>Norwegian (Bokmål)</option>
                    <option value='NL'>Dutch</option>
                    <option value='PL'>Polish</option>
                    <option value='PT'>Portuguese</option>
                    <option value='RO'>Romanian</option>
                    <option value='RU'>Russian</option>
                    <option value='SK'>Slovak</option>
                    <option value='SL'>Slovenian</option>
                    <option value='SV'>Swedish</option>
                    <option value='TR'>Turkish</option>
                    <option value='UK'>Ukrainian</option>
                    <option value='ZH'>Chinese</option>
                </select>
                <button type='submit'>Translate</button>
            </form>

            <Link to="/">Back to Home</Link>
        </>
    );
};

export default TranslatePage;
