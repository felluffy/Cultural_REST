const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Event, validateEvent } = require('../models/event');
const { Organizer } = require('../models/organizer');
const { Venue } = require('../models/venue');
//endpoints

module.exports = router;