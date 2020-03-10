const pool = require('../module-db/config')

  // Query allowing to create an event
  const createEvent = (request, response) => {
    const { title, category, date, hour, description} = request.body;

    pool.query('INSERT INTO "events" (title, category, date, hour, unix_time, description) VALUES ($1, $2, $3, $4, $5, $6)', 
    [
      title, 
      category, 
      date, 
      hour, 
      unix_time = Date.now(),
      description, 
    ], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send('Event added')
    });
  };

  // Query allowing to get all events
  const getEvents = (request, response) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      })
  };

  //Query allowing to get event by id 
  const getEventsById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      })
  };

  // Query allowing to update events table
  const updateEvent = (request, response) => {
    const id = parseInt(request.params.id);
    const { title, category, date, hour, description } = request.body;
    pool.query(
      `UPDATE events SET 
        title = $1, 
        category = $2, 
        date = $3, 
        hour = $4, 
        unix_time = $5, 
        description = $6
        WHERE id = $7`,
      [title, category, date, hour, unix_time= Date.now(), description, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send('Event modified');
      }
    );
  };

  // Query allowing to delete an event 
  const deleteEvent = (request, response) => {
    const { id } = request.params;
  
    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send('Event deleted');
    })
  };


  module.exports = {
    createEvent,
    getEventsById,
    getEvents,
    updateEvent,
    deleteEvent,
  }