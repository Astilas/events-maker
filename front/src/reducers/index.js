import { combineReducers } from 'redux';
import eventsReducer from './events';

// Reducer
const reducer = combineReducers({
  events: eventsReducer,
});


export default reducer;
