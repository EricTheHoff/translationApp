import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import "../Styles/tutorcard.css";
import { Col, Row, Container } from "react-bootstrap";

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
    <div
      style={{
        display: "inline-block",
        width: "25rem",
        margin: "5px auto",
      }}
    >
      <Card style={{ width: "rem", width: "21.5em", margin: "10px auto" }}>
        <div class="card-header">Your Saved Tutor</div>
        <Card.Body style={{ width: "18rem" }}>
          <Card.Text style={{ width: "18rem" }}>
            {name}
            <br></br>
            <br></br>
            Address: {address}
            <br></br>
            <br></br>
            Rating: {rating}
            <br></br>
            <br></br>
            Google Maps Link:
            <a href={website}> {website}</a>
          </Card.Text>
          <Button onClick={(event) => handleDelete(event)}>Remove</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TutorCard;
