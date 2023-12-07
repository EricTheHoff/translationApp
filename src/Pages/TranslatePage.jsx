import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
// import PDFUpload from "../Components/PDFUpload.jsx";

const TranslatePage = () => {
    const [uploadPDF, setUploadPDF] = useState(false)
    const [uploadText, setUploadText] = useState(false)
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

            <form>
                <input
                style={{
                    width: '85%',
                    height: '200px',
                    textAlign: 'center'
                }}
                type='textarea'
                maxLength='2000'
                placeholder='2000 Character Limit'></input>

                <select>
                    <option selected default disabled>--Choose a Language--</option>
                    <option>Bulgarian</option>
                    <option>Czech</option>
                    <option>Danish</option>
                    <option>German</option>
                    <option>Greek</option>
                    <option>Spanish</option>
                    <option>Estonian</option>
                    <option>Finnish</option>
                    <option>French</option>
                    <option>Hungarian</option>
                    <option>Indonesian</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                    <option>Lithuanian</option>
                    <option>Latvian</option>
                    <option>Norwegian (Bokmål)</option>
                    <option>Dutch</option>
                    <option>Polish</option>
                    <option>Portuguese</option>
                    <option>Romanian</option>
                    <option>Russian</option>
                    <option>Slovak</option>
                    <option>Slovenian</option>
                    <option>Swedish</option>
                    <option>Turkish</option>
                    <option>Ukrainian</option>
                    <option>Chinese</option>
                </select>
            </form>

            <Link to="/">Back to Home</Link>
        </>
    );
};

export default TranslatePage;
