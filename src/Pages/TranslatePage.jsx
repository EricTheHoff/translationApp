import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react'
import FileUpload from "../Components/FileUpload.jsx";

const TranslatePage = () => {
    // const content = document.querySelector('.content')
    // const [file, setFile] = useState(null)

    // const upload = async (e) => {
    //     e.preventDefault()
    //     const allowedExtension = 'text/plain'

    //     if(!file) {
    //         console.log(`No file selected.`)
    //         return
    //     } else if(!allowedExtension.includes(file.type)) {
    //         alert(`Only .txt files are supported at this time.`)
    //         return
    //     }

    //     console.log(file)

    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => {
    //             content.innerText = reader.result
    //         }, 'false')
            
    //         if (file) {
    //             reader.readAsText(file)
    //         }
    //     }
            
        // const formData = new FormData()
        // formData.append('file', file)

        // const response = await axios.post('/file', formData)
        // .then(async () => {
        //     const parsedResponse = await response.json()
        //     console.log(parsedResponse.data)
        // })
        // .catch((error) => {
        //     console.log(`The following error has occurred: ${error}`)
        // })

    return (
        <>
            <FileUpload/>

            <Link to="/">Back to Home</Link>
        </>
    );
};

export default TranslatePage;
