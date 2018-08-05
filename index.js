const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const venues = require('./routes/venues');
const events = require('./routes/events');
const orgranizers = require('./routes/organizers');
const periods = require('./routes/periods');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
//import file and use it or implement here
app.use('/api/venues', venues);
app.use('/api/organizers', orgranizers);
app.use('/api/periods', periods);
app.use('/api/events', events);


mongoose.connect('mongodb://localhost/cultural_uni')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));