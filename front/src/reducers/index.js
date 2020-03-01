import { combineReducers } from 'redux';
import eventsReducer from './events';
import usersReducer from './users';

// Reducer
const reducer = combineReducers({
  events: eventsReducer,
  users: usersReducer,
});


export default reducer;
