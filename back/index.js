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
app.use(function(req, res, next) {
   //Enabling CORS
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
   next();
});

// Routes
app.get('/events', db.getEvents);
app.get('/event/:id', db.getEventsById)
app.post('/events', db.createEvent);
app.put('/events/:id', db.updateEvent);
app.delete('/events/:id', db.deleteEvent);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})