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
    case 'GET_DATA_EVENT': {
      return {
        ...state, 
        title: action.title,
        category: action.category,
        description: action.description,
        hour: action.hour,
        date: action.date,
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
