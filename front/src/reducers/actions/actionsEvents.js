
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

export const clearForm = () => (dispatch) => dispatch ({
    type: 'CLEAR_FORM',
})

export const getDataEvent = (eventData) => (dispatch) => dispatch ({
    type: 'GET_DATA_EVENT',
    title: eventData[0].title,
    category: eventData[0].category,
    description: eventData[0].description,
    date: eventData[0].date,
    hour: eventData[0].hour,
    address: eventData[0].address,
})

export const filterEvent = (e) => (dispatch) => dispatch ({
    type: 'FILTER_EVENT',
    name: e.target.name,
    value: e.target.value,
})