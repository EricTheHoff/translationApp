import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const TextUpload = () => {
  const content = document.getElementById("content");
  const [textFile, setTextFile] = useState(null);
  const [highlightedText, setHighlightedText] = useState("");
  const [language, setLanguage] = useState("");
  const [selected, setSelected] = useState("");
  const [newTranslation, setNewTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [textFileContent, setTextFileContent] = useState("");
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
        toast.error("Please select word from the file");
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
    setTextFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textFile) {
      toast.error(`Please choose a file to upload.`);
      return;
    } else if (textFile.type !== "text/plain") {
      toast.error(`Please select a Plain Text file (.txt) instead.`);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // content.innerText = reader.result;
      setTextFileContent(reader.result);
    });

    if (textFile) {
      reader.readAsText(textFile);
    }
  };

  if (!uploaded) {
    return (
      <div>
        <h3>Would you like to translate a file?</h3>
        <h4>Please select a Plain Text (.txt) file to upload.</h4>

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

        <p>No Text Uploaded</p>
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
              <button onClick={saveButton}>Save To Translations</button>
            </div>
          )}
          <form>
            <br></br>

            <select onChange={(e) => setLanguage(e.target.value)}>
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
          <p id="content">file: {textFileContent}</p>

          <br></br>
          <Link to="/translate">Select a New File</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Card style={{ width: "18rem", textAlign: "center" }}>
          <Card.Header>Translation</Card.Header>
          <Card.Body>
            <Card.Title>{translation}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <form onSubmit={saveTranslation}>
              <p>Would you like to save this to your translations?</p>
              <button type="submit">Yes</button>
              <button onClick={() => setNewTranslation(false)}>No</button>
            </form>
          </Card.Footer>
        </Card>
      </>
    );
  }
};

export default TextUpload;
