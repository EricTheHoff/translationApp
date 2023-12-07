import { useState } from 'react'
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Link } from 'react-router-dom'


const PDFUpload = () => {
    const [pdfFile, setPDFFile] = useState(null)
    const [viewPDF, setViewPDF] = useState(null)
    const newplugin = defaultLayoutPlugin()
    
    const handleChange = (e) => {
        let selectedFile = e.target.files[0]

        if (fileTypes.includes(selectedFile.type)) {
            let reader = new FileReader()
            reader.readAsDataURL(selectedFile)
            reader.onload = (e) => {
                setPDFFile(e.target.result)
            }
        } else {
            setPDFFile(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!pdfFile) {
            alert(`Please choose a file to upload.`)

        } else if (!pdfFile.includes('application/pdf')) {
            alert(`Please select a PDF File.`)
        } else if(pdfFile !== null) {
            setViewPDF(pdfFile)
        } else {
            setViewPDF(null)
        }
    }

    return (
        <>
            <h3>Please Upload a PDF File</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor='upload'>Upload a File: </label>
                <input type='file' name='upload' onChange={handleChange}/>
                <br></br>
                <button type='submit'>Upload</button>
            </form>

            <br></br>

            <div>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                    {viewPDF &&
                    <>
                        <Viewer fileUrl={viewPDF} plugins={[newplugin]}/>
                    </>}
                    {!viewPDF && <>No PDF Uploaded</>}
                </Worker>
            </div>

            <br></br>

            <Link to='/translate'>Select a New File</Link>
        </>
    )
}

export default PDFUpload