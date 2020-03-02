import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './event.css';

class UpdateEventForm extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        this.updateEvent = this.updateEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
       this.props.createEvent(e)
    }

    updateEvent(e) {
        e.preventDefault();
        const {
            id,
            title, 
            category, 
            date, 
            hour, 
            description,
            eventList
        } = this.props;
        axios.put(`http://localhost:5000/events/${id}`,
            {
                title,
                category,
                date,
                hour,
                description,
            })
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
                            placeholder={title} 
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
                            placeholder={date} 
                            value={date} 
                            name="date" 
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hour</Form.Label>
                        <Form.Control 
                            type="hour" 
                            placeholder={hour}
                            value={hour} 
                            name="hour"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            placeholder={description}
                            value={description} 
                            name="description"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit"
                    >
                        Update
                    </Button>
                </Form>
            </Container>
        );
    }
}


export default UpdateEventForm;
