import React from 'react';
import Event from './Event';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEventList, filterEvent
} from '../reducers/actions/actionsEvents';
import './event.css';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.filterEventByCategory = this.filterEventByCategory.bind(this);
  }


  componentDidMount() {
    this.fetchEvents();
  }

  // Load all existing events 
  fetchEvents() {
    axios.get('http://localhost:5000/events')
      .then((res) => {
        const eventList = res.data;
        this.sortEvents(eventList);
        this.props.fetchEventList(eventList);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // sort event's date by chronology 
  sortEvents(eventList) {
    eventList.sort(function (a, b) {
      return new Date(a.date.toString()) - new Date(b.date.toString())
    })
  }

  filterEventByCategory(e) {
    this.props.filterEvent(e);
  }

  render() {
    const { eventList, categoryEvent, history } = this.props;
    return (
      <div>
        <div className="margin">
          <Button variant="success" onClick={() => history.push('/eventForm')}>
            Create new event
      </Button>
        </div>
        <Container className="border-container">
          <h1>Event list</h1>
          <Col lg={6}>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Category Selection</Form.Label>
              <Form.Control as="select" value={categoryEvent} name="categoryEvent" onChange={this.filterEventByCategory}>
                <option value="">Choose a category...</option>
                <option value="party">Party</option>
                <option value="festival">Festival</option>
                <option value="concert">Concert</option>
                <option value="conference">Conference</option>
                <option value="anniversary">Anniversary</option>
                <option value="meeting">Meeting</option>
                <option value="seminar">Seminar</option>
                <option value="team building">Team building</option>
                <option value="sport event">Sport event</option>
                <option value="">View all</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Row className="event-list">
            {
              eventList.length > 0
                ? eventList
                  .filter(event => (
                    event.category === categoryEvent || categoryEvent === ''
                  ))
                  .map((event) => (
                    <Col lg={5} md={12} sm={12} xs={9} className="margin-event" key={event.id}>
                      <Event
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        category={event.category}
                        date={event.date}
                        hour={event.hour}
                        unix_time={event.unix_time}
                        description={event.description}
                        address={event.address}
                        history={history}
                      />
                    </Col>
                  ))
                : <h1 className="text-align">No event found</h1>
            }
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  eventList: state.events.eventList,
  categoryEvent: state.events.categoryEvent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventList: bindActionCreators(fetchEventList, dispatch),
  filterEvent: bindActionCreators(filterEvent, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
