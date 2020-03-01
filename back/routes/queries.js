const pool = require('../module-db/config')

const createUser = (request, response) => {
    const { username, password } = request.body
  
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    })
  }
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    });
  };
  
  const createEvent = (request, response) => {
    const { title, category, date, hour, unix_time, description, user_id } = request.body;
    const dataEvents = { 
        title, 
        category, 
        date, 
        hour, 
        unix_time, 
        description, 
        user_id
    };
    pool.query('INSERT INTO events SET ?', dataEvents, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`Event added with ID: ${result.insertId}`)
    });
  };

  const getEvents = (request, response) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      })
  };

  const updateEvent = (req, res) => {
    const id = parseInt(request.params.id)
    const { title, category, date, hour, unix_time, description, user_id } = request.body;
  
    pool.query(
      `UPDATE events SET title = $1, 
        category = $2, 
        date = $3, 
        hour = $4, 
        unix_time = $5, 
        description = $6, 
        user_id = $7 
        WHERE id = $8`,
      [title, category, date, hour, unix_time, description, user_id, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };

  const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    })
  };


  module.exports = {
    createUser,
    getUsers,
    getUserById,
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
  }