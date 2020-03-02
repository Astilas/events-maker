export const fetchEventList = (eventList) => (dispatch) => dispatch({
    type: 'GET_EVENTLIST',
    events: eventList,
  });