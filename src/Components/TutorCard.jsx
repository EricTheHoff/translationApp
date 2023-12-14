import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function TutorCard({
  name,
  address,
  rating,
  id,
  website,
  setDeleter,
  deleter,
}) {
  const handleDelete = async (event) => {
    event.preventDefault();

    const res = await axios.delete(`http://localhost:2222/deleteSchools/${id}`);
    console.log(res.data);
    if (res.data.success) {
      console.log("deleted successfully");
      setDeleter(!deleter);
      toast.success("School Removed");
    }
  };

  return (
    <Card style={{ width: "18rem", marginLeft: "100px" }}>
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
        <Button onClick={(event) => handleDelete(event)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default TutorCard;
