import { useState } from 'react'
import React from 'react'

const FileUpload = () => {
    const content = document.getElementById('content')
    const [file, setFile] = useState(null)

    const upload = async (e) => {
        e.preventDefault()
        const allowedExtension = 'text/plain'

        if(!file) {
            console.log(`No file selected.`)
            alert(`Please choose a file to upload.`)
            return
        }
        else if(!allowedExtension.includes(file.type)) {
            alert(`Only .txt files are supported at this time.`)
            return
        }

        const reader = new FileReader()
        reader.addEventListener('load', () => {
                content.innerText = reader.result
            })
            
            if (file) {
                reader.readAsText(file)
            }
        }

    return (
        <>
            <h3>Upload a File to Translate</h3>

            <form onSubmit={upload}>
                <label htmlFor='upload'>Upload a .txt File: </label>
                <input type='file' id='uplFile' onChange={(e) => setFile(e.target.files[0])}/>
                <br></br>
                <button id='btnUpl'>Upload</button>
            </form>

            <br></br>

            <p id='content'></p>
            {/* <textarea style={{width: '300px', height: '150px'}} id='resultText' placeholder='File text will appear here...'></textarea> */}
            <br></br>
        </>
    )
}

export default FileUpload