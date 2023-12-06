import { useState } from 'react'
import React from 'react'
// import { Document, Page, pdfjs } from 'react-pdf'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
// import 'react-pdf/dist/Page/TextLayer.css'


const FileUpload = () => {
    // const content = document.getElementById('content')
    // const [file, setFile] = useState(null)
    // const [numPages, setNumPages] = useState(null)
    // const [pageNumber, setPageNumber] = useState(1)

    const [pdfFile, setPDFFile] = useState(null)
    const [viewPDF, setViewPDF] = useState(null)

    const fileTypes = ['application/pdf', 'text/plain']

    // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    //     'pdfjs-dist/build/pdf.worker.min.js',
    //     import.meta.url
    // ).toString()

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
            alert(`Please upload a file.`)

        } else if(pdfFile !== null) {
            setViewPDF(pdfFile)
        } else {
            setViewPDF(null)
        }
    }

    const newplugin = defaultLayoutPlugin()

    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages)
    //     console.log(`Total Pages:` + numPages)
    //     setPageNumber(1)
    // }

    // const changePage = (offset) => {
    //     setPageNumber(pageNumber + offset)
    // }

    // const previousPage = () => {
    //     changePage(-1)
    // }

    // const nextPage = () => {
    //     changePage(1)
    //     console.log(pageNumber)
    // }


    // const upload = async (e) => {
    //     e.preventDefault()
    //     // const allowedExtension = 'text/plain'

    //     if(!file) {
    //         console.log(`No file selected.`)
    //         alert(`Please choose a file to upload.`)
    //         return
    //     }
    //     else if(!allowedExtension.includes(file.type)) {
    //         alert(`Only .txt files are supported at this time.`)
    //         return
    //     }

    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => {
    //             content.innerText = reader.result
    //         })
            
    //         if (file) {
    //             reader.readAsText(file)
    //         }
    //     }

    return (
        <>
            <h3>Upload a File to Translate</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor='upload'>Upload a File: </label>
                <input type='file' id='uplFile' onChange={handleChange}/>
                <br></br>
                <button>Upload</button>
            </form>

            <br></br>

            <div>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                    {viewPDF && <>
                        <Viewer fileUrl={viewPDF} plugins={[newplugin]}/>
                    </>}
                    {!viewPDF && <>No PDF</>}
                </Worker>
            </div>

            {/* <div>
                <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={1}/>
                </Document>
                <div>
                    <p>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
                    <button type='button' disabled={pageNumber <= 1} onClick={previousPage}>Previous</button>
                    <button type='button' disabled={pageNumber>= numPages} onClick={nextPage}>Next</button>
                </div>
            </div> */}

            <p id='content'></p>
            <br></br>
        </>
    )
}

export default FileUpload