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
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import TranslationModal from "../Pages/TranslationModal";

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
  const id = useSelector((state) => state.userId);

  const saveButton = () => {
    setNewTranslation(true);
    console.log(newTranslation);
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

    console.log(language);

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
      };
    } else {
      setPDFFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pdfFile) {
      toast.error(`Please choose a file to upload.`);
    } else if (!pdfFile.includes("application/pdf")) {
      toast.error(`Please select a PDF File.`);
    } else if (pdfFile !== null) {
      setViewPDF(pdfFile);
      toast.success("Successfully loaded");
    } else {
      setViewPDF(null);
    }
  };

  if (!uploaded) {
    return (
      <div>
        <h3>Would you like to translate a file?</h3>
        <h4>Please select a PDF file to upload.</h4>

        <form
          onSubmit={(e) => {
            setUploaded(true);
            handleSubmit(e);
          }}
        >
          <label htmlFor="upload">Upload a File: </label>
          <input type="file" name="upload" onChange={handleChange} />
          <br></br>
          <button type="submit">Upload</button>
        </form>

        <br></br>

        <p>No PDF Uploaded</p>
      </div>
    );
  }

  if (uploaded && !newTranslation) {
    return (
      <>
        <div
          onMouseUp={() => {
            handleSelection();
          }}
        >
          <p>Highlight text in the file to see its translation</p>
          {translation && (
            <div>
              <p>Translation: {translation}</p>{" "}
              <Button
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
              onChange={(e) => {
                setLanguage(e.target.value);
                setLongLang(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option selected default disabled>
                --Choose a Language--
              </option>
              <option value="BG">Bulgarian</option>
              <option value="CS">Czech</option>
              <option value="DA">Danish</option>
              <option value="DE">German</option>
              <option value="EL">Greek</option>
              <option value="ES">Spanish</option>
              <option value="ET">Estonian</option>
              <option value="FI">Finnish</option>
              <option value="FR">French</option>
              <option value="HU">Hungarian</option>
              <option value="ID">Indonesian</option>
              <option value="IT">Italian</option>
              <option value="JA">Japanese</option>
              <option value="KO">Korean</option>
              <option value="LT">Lithuanian</option>
              <option value="LV">Latvian</option>
              <option value="NB">Norwegian (Bokmål)</option>
              <option value="NL">Dutch</option>
              <option value="PL">Polish</option>
              <option value="PT">Portuguese</option>
              <option value="RO">Romanian</option>
              <option value="RU">Russian</option>
              <option value="SK">Slovak</option>
              <option value="SL">Slovenian</option>
              <option value="SV">Swedish</option>
              <option value="TR">Turkish</option>
              <option value="UK">Ukrainian</option>
              <option value="ZH">Chinese</option>
            </select>
          </form>
          <br></br>
          <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {viewPDF && (
                <div id="pdffile">
                  <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
                </div>
              )}
              {!viewPDF && <>No PDF Uploaded</>}
            </Worker>
          </div>

          <Link to="/translate">Select a New File</Link>
        </div>
        ;
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
