// const pool = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./routes/queries');
const port = 5000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// Routes
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.get('/events', db.getEvents);
app.post('/events', db.createEvent);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})