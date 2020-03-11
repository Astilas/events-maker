import React from 'react';
import Event from './Event';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEventList,
} from '../reducers/actions/actionsEvents';
import './event.css';

class EventsList extends React.Component {

  componentDidMount() {
    this.fetchEvents();
  }

  // Load all existing events 
  fetchEvents() {
    axios.get('http://localhost:5000/events')
      .then((res) => {
        const eventList = res.data;
        console.log(eventList);
        this.sortEvents(eventList);
        this.props.fetchEventList(eventList);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // sort event's date by chronology 
  sortEvents(eventList){
    eventList.sort(function(a,b){
      return new Date(a.date.toString()) - new Date(b.date.toString())
    })
  }

  render() {
    const { eventList, history } = this.props;
    return (
      <div>
        <div className="margin">
          <Button onClick={() => history.push('/eventForm')}>
            Create new event
      </Button>
        </div>
        <Container className="border-container">
          <h1>Liste des événements:</h1>
          <Row className="event-list">
            {
              eventList.length > 0
                ? eventList.map((event) => (
                  <Col lg={5} md={5} sm={5} xs={12} className="margin-event">
                    <Event
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      category={event.category}
                      date={event.date}
                      hour={event.hour}
                      unix_time={event.unix_time}
                      description={event.description}
                      history={history}
                    />
                  </Col>
                ))
                : <h1 className="text-align">Aucun événement</h1>
            }
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
            fetchEventList: bindActionCreators(fetchEventList, dispatch),
        });
        
        export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
