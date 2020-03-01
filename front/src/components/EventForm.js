import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';

function EventForm() {
    return (
        <Container className="">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Categorie</Form.Label>
                    <Form.Control as="select">
                        <option>Fête</option>
                        <option>Conférence</option>
                        <option>Anniversaire</option>
                        <option>Réunion</option>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default EventForm;
