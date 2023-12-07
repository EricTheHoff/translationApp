import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TextUpload = () => {
    const content = document.getElementById('content')
    const [textFile, setTextFile] = useState(null)

    const handleChange = (e) => {
        setTextFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
    e.preventDefault()

    if(!textFile) {
        console.log(`No file selected.`)
        alert(`Please choose a file to upload.`)
        return
    }
    else if(textFile.type !== 'text/plain') {
        alert(`Please select a Plain Text file (.txt) instead.`)
        return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
            content.innerText = reader.result
    })
        
    if (textFile) {
        reader.readAsText(textFile)
    }
    }

    return (
        <>
            <h3>Please Upload a Plain Text File</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor='upload'>Upload a File: </label>
                <input type='file' name='upload' onChange={handleChange}/>
                <br></br>
                <button type='submit'>Upload</button>
            </form>

            <br></br>

            <p id='content'> No Text Uploaded</p>

            <br></br>

            <Link to='/translate'>Select a New File</Link>
        </>
    )
}

export default TextUpload