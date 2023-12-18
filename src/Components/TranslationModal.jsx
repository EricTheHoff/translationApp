import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const TranslationModal = (props) => {
  const {
    translation,
    saveTranslation,
    setNewTranslation,
    show,
    longLang,
    selected,
    onHide,
  } = props;

  return (
    <div>
      {" "}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal d-flex justify-text-center"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          <h1>Would you like to save this to your translations?</h1>
        </Modal.Title>
        <Modal.Body>
          <p>
            <span>English:</span> {selected}
            <br></br>
            <span>{longLang}:</span> {translation}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <form onSubmit={saveTranslation}>
            <Button
              className="btn bg-dark"
              onClick={() => setNewTranslation(false)}
            >
              No
            </Button>
            <Button type="submit">Yes</Button>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TranslationModal;
