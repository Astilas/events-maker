import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent } from '../reducers/actions/actionsEvents';
import './event.css';

class UpdateEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateEvent = this.updateEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.createEvent(e)
        // Change state on input
    }

    // Update event with corresponding id
    updateEvent(e) {
        e.preventDefault();
        const {
            title,
            category,
            date,
            hour,
            description,
            history
        } = this.props;
        axios.put(`http://localhost:5000/events/${this.props.match.params.id}`,
            {
                title,
                category,
                date,
                hour,
                description,
            })
            .then(() => history.push('/'))
            .catch((e) => console.log(e))
    };

    render() {
        const {
            title,
            category,
            date,
            hour,
            description,
        } = this.props;
        return (
            <Container className="">
                <h1 className="margin">Mise à jour de l'événement</h1>
                <Form onSubmit={this.updateEvent}>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Titre</Form.Label>
                                <Form.Control
                                    type="name"
                                    value={title}
                                    name="title"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Categorie</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={category}
                                    name="category"
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="fête">Fête</option>
                                    <option value="conférence">Conférence</option>
                                    <option value="anniversaire">Anniversaire</option>
                                    <option value="réunion">Réunion</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    name="date"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Heure</Form.Label>
                                <Form.Control
                                    type="hour"
                                    value={hour}
                                    name="hour"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={description}
                            name="description"
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Update
                    </Button>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    eventList: state.events.eventList,
    title: state.events.title,
    category: state.events.category,
    date: state.events.date,
    hour: state.events.hour,
    description: state.events.description,
});

const mapDispatchToProps = (dispatch) => ({
    createEvent: bindActionCreators(createEvent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventForm);