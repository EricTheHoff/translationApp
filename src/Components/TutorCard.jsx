import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios"
import { useEffect, useState } from 'react'

function TutorCard({ name, address, phone, website, id }) {

    const [deleteTutorState, setDeleteTutorState] = useState()

    function handleDelete() {
        axios.delete(`http://localhost:2222/deleteSchools/${id}`);
    }
    return (
        <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>Address: {address}</ListGroup.Item>
                <ListGroup.Item>Phone: {phone}</ListGroup.Item>
                <ListGroup.Item>Website: {website}</ListGroup.Item>
            </ListGroup>
            </Card.Text>
            <Button onClick={handleDelete}>Delete</Button>
        </Card.Body>
        </Card>
    );
}


export default TutorCard;
