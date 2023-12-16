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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>
              English: {selected}
              <br></br>
              {longLang}: {translation}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Would you like to save this to your translations?</p>
        </Modal.Body>
        <Modal.Footer>
          <form onSubmit={saveTranslation}>
            <Button type="submit">Yes</Button>
            <Button onClick={() => setNewTranslation(false)}>No</Button>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TranslationModal;
