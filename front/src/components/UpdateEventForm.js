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

    checkTodayDate() {
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) date = `0${day}`;
        const todayDate = `${year}-0${month}-${day}`;
        return todayDate;
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
            address,
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
                address
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
            address,
            history,
        } = this.props;

        const todayDate = this.checkTodayDate();
        return (
            <Container className="">
                <h1 className="margin">Update your event</h1>
                <Form onSubmit={this.updateEvent}>
                    <Row>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <Form.Group>
                                <Form.Label className="font-size">Title</Form.Label>
                                <Form.Control
                                    type="name"
                                    value={title}
                                    placeholder={title}
                                    name="title"
                                    onChange={this.handleChange}
                                    maxLength="30"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <Form.Group>
                                <Form.Label className="font-size">Address</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="event's address"
                                    value={address}
                                    name="address"
                                    onChange={this.handleChange}
                                    maxLength="40"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <Form.Group>
                                <Form.Label className="font-size">Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={category}
                                    name="category"
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value={category}>{category}</option>
                                    <option value="party">Party</option>
                                    <option value="conference">Conference</option>
                                    <option value="anniversary">Anniversary</option>
                                    <option value="meeting">Meeting</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group>
                                <Form.Label className="font-size">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date.slice(0,10)}
                                    name="date"
                                    onChange={this.handleChange}
                                    min={todayDate}
                                    max="2025-12-31"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Form.Group className="font-size">
                                <Form.Label>Hour</Form.Label>
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
                        <Form.Label className="font-size">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={description}
                            name="description"
                            placeholder={description}
                            onChange={this.handleChange}
                            maxLength="200"
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="light"
                        type="submit"
                        className="margin"
                    >
                        Update
                    </Button>
                    <Button
                        variant="light"
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
    address: state.events.address,
});

const mapDispatchToProps = (dispatch) => ({
    createEvent: bindActionCreators(createEvent, dispatch),
    getDataEvent: bindActionCreators(getDataEvent, dispatch),
    clearForm: bindActionCreators(clearForm, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventForm);