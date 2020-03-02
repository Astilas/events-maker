const initialState = {
  eventList : [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTLIST': {
      const { eventList } = state;
      return {
        ...state, 
        eventList: [...eventList, ...action.events],
      }
    }
    default:
      return state;
  }
};

export default eventsReducer;
