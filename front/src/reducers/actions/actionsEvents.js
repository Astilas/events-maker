export const fetchEventList = (eventList) => (dispatch) => dispatch({
    type: 'GET_EVENTLIST',
    events: eventList,
  });

export const createEvent = (e) => (dispatch) => dispatch ({
    type: 'POST_EVENT',
    name: e.target.name,
    value: e.target.value,
})

export const deleteOneEvent = (newEventList) => (dispatch) => dispatch ({
    type: 'DELETE_EVENT',
    events: newEventList,
})

export const addEvent = (newEvent) => (dispatch) => dispatch ({
    type: 'ADD_EVENT',
    events: newEvent,
})

export const clearForm = () => (dispatch) => dispatch ({
    type: 'CLEAR_FORM',
})