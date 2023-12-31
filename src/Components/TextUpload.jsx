import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import TranslationModal from "./TranslationModal";
import "../Styles/txt.css";
import { codeMapping, codes } from "../CountryCodes/countryCodes.js";

const TextUpload = () => {
  const content = document.getElementById("content");
  const [textFile, setTextFile] = useState(null);
  const [language, setLanguage] = useState("");
  const [selected, setSelected] = useState("");
  const [newTranslation, setNewTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [textFileContent, setTextFileContent] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [longLang, setLongLang] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const id = useSelector((state) => state.userId);

  const saveButton = () => {
    setNewTranslation(true);
  };

  // set selectedText equal to the highlighted text as a string
  const handleSelection = async () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const selectedText = selection.toString();

      // Check if the selection is within the actual file
      const contentElement = document.getElementById("content");
      if (contentElement && contentElement.contains(selection.anchorNode)) {
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

  //save the translation/original text to the database
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
        console.error(`The following error has occurred: ${error}`)
        toast.error(`Translation could not be saved. Try saving a smaller phrase instead.`);
      });
  };

  const handleChange = (e) => {
    setTextFile(e.target.files[0]);
    setFileSelected(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //no file selected
    if (!textFile) {
      toast.error(`Please choose a file to upload.`);
      return;
      //file selected not .txt type
    } else if (textFile.type !== "text/plain") {
      toast.error(`Please select a Plain Text file (.txt) instead.`);
      return;
    }
    //pdf file selected ==> load content
    toast.promise(
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setTextFileContent(reader.result); // Update state with the file content
          resolve(); // Resolve the promise after setting the content
        });

        reader.readAsText(textFile);
      }),
      {
        loading: "loading file...", // Display while reading the file
        success: () => {
          setUploaded(true); // Set uploaded to true when the file is successfully loaded
          return "successfully loaded";
        },
        error: () => {
          toast.error(<b>Could not load file content.</b>);
          setUploaded(false); // Set uploaded to false when there's an error loading the file
          return <b>Could not load file content.</b>;
        },
      }
    );
  };

  //display this before a file is uploaded
  if (!uploaded) {
    return (
      <div className="upload-container">
        <h4 className="form-labels">Please select a .txt file to upload</h4>
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

  //display this after a file was uploaded
  if (uploaded && !newTranslation) {
    return (
      <>
        <div className="file-header">
          <h1 className="header-1 light-title">
            Select a language & highlight text in your file to see a live
            translation!
          </h1>
          <Link className="btn new-file-btn ibtn" to="/translate">
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
                className="blue-button ibtn"
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
          <div>
            <p id="content" className="txt-file">
              file: {textFileContent}{" "}
            </p>
          </div>

          <br></br>
        </div>
      </>
    );
    //display this if text was highlighted and "save translation" was clicked
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

export default TextUpload;
