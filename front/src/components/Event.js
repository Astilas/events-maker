import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteOneEvent,
} from '../reducers/actions/actionsEvents';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import './event.css';

const notify = () => toast('Your event has been removed');

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDelete = this.handleDelete.bind(this);
  }

  // function that delete an event with corresponding id
  deleteEvent(id) {
    const { eventList } = this.props;
    (
      axios.delete(`http://localhost:5000/events/${id}`)
        .then(() => {
          const newEventList = eventList
            .filter((event) => event.id !== id);
          this.props.deleteOneEvent(newEventList);
          //delete one event state
        })
    );
  };


  handleDelete(id) {
    this.deleteEvent(id)
  }

  render() {
    const { title, date, hour, unix_time, description, address, id, history } = this.props;
    const unixTime = parseInt(unix_time)
    const year = new Date(unixTime).getFullYear();
    let month = new Date(unixTime).getMonth()+1;
    if (month < 10) month = `0${month}`
    const day = new Date(unixTime).getDate();
    const hours = new Date(unixTime).getHours();
    const minutes = new Date(unixTime).getMinutes();

    return (
      <Container>
      <Row className="div-event">
        <Card bg="info" text="white" style={{ width: '30rem', height:'30rem' }}>
          <Card.Header>
            <h2>{title}</h2>
          </Card.Header>
          <Card.Header>
            <h5>Adress: {address}</h5>
          </Card.Header>
          <Card.Body className="card-body-css">
            <Card.Title>Le {date.slice(0, 10)} à {hour.slice(0, 5)}</Card.Title>
            <Card.Text className="">
              {description}
              <small className="content-right">created {year}-{month}-{day} at {hours}:{minutes} {} </small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <FontAwesomeIcon
              icon={faEdit}
              className="icon-size"
              onClick={() =>
                history.push(`/update-event/${id}`)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icon-size"
              onClick={() => {this.handleDelete(id); notify()}}
            />
          </Card.Footer>
        </Card>
      </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  eventList: state.events.eventList,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOneEvent: bindActionCreators(deleteOneEvent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
