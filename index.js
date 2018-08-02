const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const app = express();

mongoose.connect('mongodb://localhost/cultural_uni')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

//import file and use it or implement here



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));