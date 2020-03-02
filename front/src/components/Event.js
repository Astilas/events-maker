import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteOneEvent,
} from '../reducers/actions/actionsEvents';
import './event.css';

class Event extends React.Component {
  constructor(props){
    super(props);
    this.state={};

    this.handleDelete = this.handleDelete.bind(this);
  }

  deleteEvent(id){
    const { eventList } = this.props;
    (
      axios.delete(`http://localhost:5000/events/${id}`)
        .then(() => {
          const newEventList = eventList
            .filter((event) => event.id !== id);
          this.props.deleteOneEvent(newEventList);
        })
    );
  };


  handleDelete(id){
    this.deleteEvent(id)
  }

  render(){
    const { title, category, date, hour, unix_time, description, id } = this.props;
    return (
      <div className="App">
        <h1>coucou voici un événement</h1>
        <Container className="border-container">
          <Row>
            <Col className="icon-column">
              <FontAwesomeIcon 
                icon={faEdit} 
                className="icon-size" 
                // onClick={()=> 
                //   <UpdateEventForm
                //     key={event.id}
                //     id={id} 
                //     title={title}
                //     category={category}
                //     date={date}
                //     hour={hour}
                //     unix_time={unix_time}
                //     description={description}
                //   />
              />
              <FontAwesomeIcon icon={faTrash} className="icon-size" onClick={() => this.handleDelete(id)} />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1>{title} {id}</h1>
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

const mapStateToProps = (state) => ({
  eventList: state.events.eventList,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOneEvent: bindActionCreators(deleteOneEvent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
