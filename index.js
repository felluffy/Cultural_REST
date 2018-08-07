const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//add mongoose

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var users = require('./routes/users');
//add me

const venues = require('./routes/venues');
const events = require('./routes/events');
const orgranizers = require('./routes/organizers');
// //const periods = require('./routes/periods');





const mongoose = require('mongoose');
//const express = require('express');
//edit
//var app = express(); edit 

/*//joy edit
app.use(express.json());
//import file and use it or implement here
app.use('/api/venues', venues);
app.use('/api/organizers', orgranizers);
// //app.use('/api/periods', periods);
app.use('/api/events', events);*/


/*mongoose.connect('mongodb://localhost/cultural_uni')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));*/
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

//add me

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
//app.use(passport.session());

//app.use('/', index);
app.use('/users', users);

app.use(express.json());
//import file and use it or implement here
app.use('/api/venues', venues);
app.use('/api/organizers', orgranizers);
// //app.use('/api/periods', periods);
app.use('/api/events', events);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));