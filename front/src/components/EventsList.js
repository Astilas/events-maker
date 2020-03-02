import React from 'react';
import Event from './Event';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEventList,
} from '../reducers/actions/actionsEvents';

class EventsList extends React.Component {

  componentDidMount(){
    this.fetchEvents();
  }

  fetchEvents(){
    axios.get('http://localhost:5000/events')
      .then((res) => {
        const eventList = res.data;
        this.props.fetchEventList(eventList)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { eventList } = this.props;
    return (
    <div className="">
      {
        eventList.map((event) =>(
          <Event
            key={event.id} 
            title={event.title}
            category={event.category}
            date={event.date}
            hour={event.hour}
            unix_time={event.unix_time}
            description={event.description}
          />
      ))
    }
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
