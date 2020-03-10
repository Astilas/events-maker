import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent, getDataEvent, clearForm } from '../reducers/actions/actionsEvents';
import './event.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast('Your event has been updated');
const notifyError = () => toast('Unexpected error has occur')
toast.configure();

class UpdateEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateEvent = this.updateEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchEventData = this.fetchEventData.bind(this);
    }

    componentDidMount() {
        this.fetchEventData()
    }
    handleChange(e) {
        this.props.createEvent(e)
        // Change state on input
    }

    // fetch data from one particular event
    fetchEventData(){
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/event/${id}`)
        .then((res) => {
            const eventData = res.data;
            this.props.getDataEvent(eventData);
        })
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
        const { id } = this.props.match.params;
        axios.put(`http://localhost:5000/events/${id}`,
            {
                title,
                category,
                date,
                hour,
                description,
            })
            .then(() => history.push('/'))
            .then(() => this.props.clearForm())
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
            history,
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
                                    placeholder={title}
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
                                    <option value={category}>{category}</option>
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
                                    value={date.slice(0,10)}
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
                                    type="time"
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
                            placeholder={description}
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
                        Update
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {history.push("/"); this.props.clearForm()}}
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
    getDataEvent: bindActionCreators(getDataEvent, dispatch),
    clearForm: bindActionCreators(clearForm, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventForm);