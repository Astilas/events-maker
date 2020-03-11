import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent, clearForm } from '../reducers/actions/actionsEvents';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast('Your event has been created');
const notifyError = () => toast('Unexpected error has occur')
toast.configure();

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.postEvent = this.postEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.createEvent(e)
        // add event on state 
    }

    checkTodayDate() {
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        if (day < 10) date = `0${day}`;
        const todayDate = `${year}-0${month}-${day}`;
        return todayDate;
    }

    // create event 
    postEvent(e) {
        e.preventDefault();
        const {
            title,
            category,
            date,
            hour,
            description,
            history
        } = this.props;
        axios.post('http://localhost:5000/events',
            {
                title,
                category,
                date,
                hour,
                description,
            })
            .then(() => history.push('/'))
            .then(() => this.props.clearForm()) // clear inpput
            .then(() => notify())
            .catch((e) => notifyError())
    };

    render() {
        const {
            title,
            category,
            date,
            hour,
            description,
            history
        } = this.props;
        const todayDate = this.checkTodayDate();
        return (
            <Container className="margin">
                <h1 className="margin">Formulaire</h1>
                <Form onSubmit={this.postEvent}>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Titre</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="title"
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
                                    <option value="">Choose...</option>
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
                                    min={todayDate}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label>Heure</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="16h30"
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
                            maxLength="260"
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="margin"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => history.push("/")}
                    >
                        Back
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
    clearForm: bindActionCreators(clearForm, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);

