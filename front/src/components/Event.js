import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './event.css';

function Event() {
  return (
    <div className="App">
     <h1>coucou voici un événement</h1>
     <Container className="border">
      <Row>
        <Col>
          <FontAwesomeIcon icon={faEdit} className="" />
          <FontAwesomeIcon icon={faTrash} className="" />
        </Col>
        <Col>
          <h1>Titre</h1>
        </Col>
        <Col>
          <h1>type d'événement</h1>
        </Col>
        <Col>
          <h1>date</h1>
        </Col>
        <Col>
          <h1>heure</h1>
        </Col>
        <Col>
          <h1>description</h1>
        </Col>
        <small>created or updated since timestamp</small>
      </Row>
     </Container>
    </div>
  );
}

export default Event;
