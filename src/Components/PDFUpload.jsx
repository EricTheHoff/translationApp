import { useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import TranslationModal from "./TranslationModal";
import "../Styles/txt.css";
import { codes, codeMapping } from "../CountryCodes/countryCodes.js";

const PDFUpload = () => {
  const [pdfFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);
  const [language, setLanguage] = useState("");
  const newplugin = defaultLayoutPlugin();
  const [selected, setSelected] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [newTranslation, setNewTranslation] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [translation, setTranslation] = useState("");
  const [longLang, setLongLang] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const id = useSelector((state) => state.userId);

  const saveButton = () => {
    setNewTranslation(true);
  };

  const handleSelection = async () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const selectedText = selection.toString();

      // Check if the selection is within the element with id 'pdffile'
      const pdffileElement = document.getElementById("pdffile");
      if (pdffileElement && pdffileElement.contains(selection.anchorNode)) {
        // Perform translation when text is highlighted
        if (language) {
          try {
            const translationData = {
              translation: selectedText,
              language,
              source: "EN",
            };
            const response = await axios.post("/translate", translationData);
            setSelected(selectedText);
            setTranslation(response.data.translations[0].text);
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        toast.error("Please select text from the file");
      }
    }
  };

  const saveTranslation = async (e) => {
    e.preventDefault();

    const translationData = {
      translatedText: translation,
      originalText: selected,
      id: id,
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

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile.type.includes("application/pdf")) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setPDFFile(e.target.result);
        setFileSelected(true);
      };
    } else {
      setPDFFile(null);
      setFileSelected(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pdfFile) {
      toast.error(`Please choose a file to upload.`);
    } else if (!pdfFile.includes("application/pdf")) {
      toast.error(`Please select a PDF File.`);
    } else {
      toast.promise(
        new Promise((resolve) => {
          setViewPDF(pdfFile);
          resolve(); // Resolve the promise after setting the PDF content
        }),
        {
          loading: "loading file...", // Display while setting the PDF content
          success: () => {
            setUploaded(true); // Set uploaded to true when the file is successfully loaded
            return "Successfully loaded";
          },
          error: () => {
            setUploaded(false); // Set uploaded to false when there's an error loading the file
            return <b>Could not load PDF file content.</b>;
          },
        }
      );
    }
  };

  if (!uploaded) {
    return (
      <div className="upload-container">
        <h4 className="form-labels">Please select a PDF file to upload</h4>
        <div className="form-container">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="file"
              name="upload"
              onChange={handleChange}
              className="form-input"
            />
            <br></br>
            <button
              type="submit"
              disabled={!fileSelected}
              className="form-button ibtn"
            >
              Upload
            </button>
          </form>
        </div>
        <div>
          <Link to="/translate">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (uploaded && !newTranslation) {
    return (
      <>
        <div className="file-header">
          <h1 className="header-1 light-title">
            Select a language & highlight text in your file to see a live
            translation!
          </h1>
          <Link className="btn button-link new-file-btn ibtn" to="/translate">
            Select Another File
          </Link>
        </div>
        <div
          className="file-container"
          onMouseUp={() => {
            handleSelection();
          }}
        >
          {translation && (
            <div className="translation-container">
              <p>Translation: {translation}</p>{" "}
              <Button
                className="blue-button"
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  saveButton();
                }}
              >
                Save Translation
              </Button>
            </div>
          )}
          <form>
            <br></br>

            <select
              className="select-language"
              onChange={(e) => {
                setLanguage(e.target.value);
                setLongLang(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option>--Choose a Language--</option>
              {codes.map((el, idx) => {
                return (
                  <option key={idx} value={el}>
                    {codeMapping[el]}
                  </option>
                );
              })}
            </select>
          </form>
          <br></br>
          <div id="pdf-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {viewPDF && (
                <div id="pdffile">
                  <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
                </div>
              )}
              {!viewPDF && <>No PDF Uploaded</>}
            </Worker>
          </div>
        </div>
      </>
    );
  } else if (newTranslation) {
    // Render the modal when newTranslation is true
    return (
      <>
        <TranslationModal
          selected={selected}
          translation={translation}
          saveTranslation={saveTranslation}
          setNewTranslation={setNewTranslation}
          show={modalShow}
          longLang={longLang}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  } else {
    null;
  }
};

export default PDFUpload;
