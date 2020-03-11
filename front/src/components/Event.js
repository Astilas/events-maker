import React from 'react';
import { Row } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteOneEvent,
} from '../reducers/actions/actionsEvents';
import Card from 'react-bootstrap/Card';
import './event.css';

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
    const { title, date, hour, unix_time, description, id, history } = this.props;
    const unixTime = parseInt(unix_time)
    const year = new Date(unixTime).getFullYear();
    const month = new Date(unixTime).getUTCMonth()+1;
    const day = new Date(unixTime).getUTCDate();
    const hours = new Date(unixTime).getHours();
    const minutes = new Date(unixTime).getMinutes();

    return (
      <Row className="div-event">
        <Card bg="light" style={{ width: '30rem' }}>
          <Card.Header>
            <h2>{title}</h2>
          </Card.Header>
          <Card.Body>
            <Card.Title>{date.slice(0, 10)} à {hour.slice(0, 5)}</Card.Title>
            <Card.Text>
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
              onClick={() => this.handleDelete(id)}
            />
          </Card.Footer>
        </Card>
      </Row>
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
