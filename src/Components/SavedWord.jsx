import { Card, ListGroup } from "react-bootstrap";

export default function SavedWord({
  translation,
  handleDelete,
  id,
  codeMapping,
}) {
  return (
    <>
      <div
      style={{margin: "5px auto"}}
      >
      <Card style={{ width: "21.5em" }}>
        <div class="card-header">My Saved Translation</div>
        <Card.Body style={{ width: "18rem" }}>
          <Card.Text style={{ width: "18rem" }}></Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>English: {translation.original}</ListGroup.Item>
            <ListGroup.Item>
              {codeMapping[translation.toLanguage]}: {translation.word}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <button onClick={() => handleDelete(id)}>Remove</button>
        </Card.Footer>
      </Card>
      </div>
    </>
  );
}
