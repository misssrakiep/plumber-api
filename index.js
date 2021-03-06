const express = require('express');
const mongoose = require('mongoose');
const Models = require('./plumberModel');
const bodyParser = require('body-parser');
const models = Models(process.env.MONGO_DB_URL ||'mongodb://localhost:27017/plumbers');
const Plumbers = require('./plumbers');
const plumbers = Plumbers(models);
const app = express();
const http = require('http');

//RESPONSE HEADERS
//Grant access to the resources to web browers
//specify what they can and can't do
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//routes to app
app.get('/', function(req, res) {
  res.redirect('/api/home');
});
app.get('/api/home', plumbers.home);

app.get('/api/plumbers/:fullName', plumbers.bookings)

//book a plumber in a certain time slot and on a certain day
app.post('/api/plumbers/:id/slot/:slot/day/:day/client/:clientName', plumbers.book);
// //register as a new plumber
app.post('/api/plumbers', plumbers.register);
//
// //show plumber all his bookings
// app.get('/api/plumbers/:id/bookings', plumbers.showBookings);


//start the server at:

const port = process.env.PORT || 4040;
app.listen(port, function() {
  console.log('Running on port ' + port);
});
app.set('port', process.env.PORT || port);
