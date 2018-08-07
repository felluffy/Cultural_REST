const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Venue, validateVenue } = require('../models/venue');

// //endpoints
router.get('/', async (req, res) => {
    const venues = await Venue.find().sort('name');
    res.send(venues);
});

module.exports = router;