import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup } from 'react-bootstrap'

export default function SavedWord({ translation, handleDelete, id, codeMapping }) {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>English: {translation.original}</ListGroup.Item>
                    <ListGroup.Item>{codeMapping[translation.toLanguage]}: {translation.word}</ListGroup.Item>
                </ListGroup>
                <Card.Footer>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                </Card.Footer>
            </Card>
        </>
    );
}
