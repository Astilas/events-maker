import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './event.css';

class Event extends React.Component {
  render(){
    const { title, category, date, hour, unix_time, description } = this.props;
    return (
      <div className="App">
        <h1>coucou voici un événement</h1>
        <Container className="border-container">
          <Row>
            <Col className="icon-column">
              <FontAwesomeIcon icon={faEdit} className="icon-size" />
              <FontAwesomeIcon icon={faTrash} className="icon-size" />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{title}</h1>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{category}</h1>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{date}</h1>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{hour}</h1>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{description}</h1>
            </Col>
            <small>created or updated since {unix_time}</small>
          </Row>
        </Container>
      </div>
    );
  }
}

  export default Event;
