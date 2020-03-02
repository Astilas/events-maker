import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEvent, addEvent, clearForm } from '../reducers/actions/actionsEvents';

class EventForm extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        this.postEvent = this.postEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
       this.props.createEvent(e)
    }

    postEvent(e) {
        e.preventDefault();
        const {
            title, 
            category, 
            date, 
            hour, 
            description,
            eventList
        } = this.props;
        axios.post('http://localhost:5000/events',
            {
                title,
                category,
                date,
                hour,
                description,
            })
            .then((response) => response.config.data)
            .then(() => this.props.addEvent(eventList))
            .then(() => this.props.clearForm())
            .catch((e) => console.log(e))
    };

    render() {
        const {
            title, 
            category, 
            date, 
            hour, 
            description, 
        } = this.props;
        return (
            <Container className="">
                <Form onSubmit={this.postEvent}>
                    <Form.Group>
                        <Form.Label>Titre</Form.Label>
                        <Form.Control 
                            type="name" 
                            placeholder="username" 
                            value={title} 
                            name="title" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categorie</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={category} 
                            name="category" 
                            onChange={this.handleChange}
                        >
                            <option value="fête">Fête</option>
                            <option value="conférence">Conférence</option>
                            <option value="anniversaire">Anniversaire</option>
                            <option value="réunion">Réunion</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            placeholder="yyyy-mm-dd" 
                            value={date} 
                            name="date" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hour</Form.Label>
                        <Form.Control 
                            type="hour" 
                            placeholder="16h30"
                            value={hour} name="hour"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            value={description} 
                            name="description"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

  const mapStateToProps = (state) => ({
    eventList: state.events.eventList,
    title: state.events.title,
    category: state.events.category,
    date: state.events.date,
    hour: state.events.hour,
    description: state.events.description,
  });

  const mapDispatchToProps = (dispatch) => ({
    createEvent: bindActionCreators(createEvent, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch),
    clearForm: bindActionCreators(clearForm, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
  
