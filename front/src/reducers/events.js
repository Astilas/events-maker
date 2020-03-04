const initialState = {
  eventList : [],
  title: '', 
  category: '', 
  date: '', 
  hour: '',  
  description:'',
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTLIST': {
      return {
        ...state, 
        eventList: [...action.events],
      }
    }
    case 'POST_EVENT': {
      return {
        ...state, 
        [action.name]: action.value,
      }
    }
    case 'DELETE_EVENT': {
      return {
        ...state,
        eventList: action.events,
      }
    }
    
    case 'CLEAR_FORM': {
      const { eventList } = state;
      return {
        eventList,
        title: '', 
        category: '', 
        date: '', 
        hour: '',  
        description:'',
      }
    }
    default:
      return state;
  }
};

export default eventsReducer;
