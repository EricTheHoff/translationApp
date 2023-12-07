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

            <Link to="/">Back to Home</Link>
        </>
    );
};

export default TranslatePage;
