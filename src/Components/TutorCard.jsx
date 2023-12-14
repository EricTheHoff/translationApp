import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function TutorCard({ name, address, rating, id, website }) {
  function handleDelete() {
    axios.delete(`http://localhost:2222/deleteSchools/${id}`);
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Text>
          {name}
          <br></br>
          Address: {address}
          <br></br>
          Rating: {rating}
          <br></br>
          Website:
          <a href={website}> {website}</a>
        </Card.Text>
        <Button onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default TutorCard;
