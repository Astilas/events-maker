import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Event from './components/Event';
import EventsList from './components/EventsList';
import EventForm from './components/EventForm';
import UpdateEventForm from './components/UpdateEventForm';
import Error from './components/Error'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/eventForm" component={EventForm} />
        <Route exact path="/" render={props => <EventsList {...props} />} />
        <Route exact path="/event/:id" render={props => <Event {...props} />} />
        <Route exact path="/update-event/:id" component={UpdateEventForm} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
