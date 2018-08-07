const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Event, validateEvent } = require('../models/event');

//routes
router.get('/', async (req, res) => {
    const events = await Event.find().sort('eventName');
    res.send(events);
});

router.get('/entry/:entry', async (req, res) => {
    const eventsq = await Event.find({ entry: req.params.entry })
    if (!events)
        return res.status(404).send(req.params.entry + ' events were not found');
    res.send(events);
});

router.get('/date/:date', async (req, res) => {
    const events = await Event.find({ start: req.params.date });
    if (!events)
        return res.status(404).send('No events on the given day');
    res.send(events);
}) //fetch all on a given date

router.get('/type/:type', async (req, res) => {
    const events = await Event.find({ eventType: req.params.type });
    if (!events)
        return res.status(404).send('No events under type: ' + req.pramas.type);
    res.send(events);
})

router.get('/name/:name', async (req, res) => {
    const events = await Event.find({ eventName: req.params.name });
    if (!events)
        return res.status(404).send('No events under name: ' + req.pramas.type);
    res.send(events);
})

router.get('/eventorganizer/:eventorganizer', async (req, res) => { //gets all activites under an organzier
    const events = await Event.find({ 'organizer.name': req.params.eventorganizer });
    if(!events)
        return res.status(404).send(req.params.eventorganizer + ' doesnt have any currently listed events');
    res.send(events);
});

//get all events under a location
router.get('/location/:location', async(req, res) => {
    const events = await Event.find({ 'venue.name': req.params.location });
    if(!events)
        return res.status(404).send(req.params.location + ' doesnt have any currently listed events');
    res.send(events);
});

router.post('/', async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const venue = await Venue.findById(req.body.venueId)
    if (!venue)
        return res.status(400).send('Invalid venue or venue not in database');

    const organizer = await Organizer.findById(req.body.organizerId);
    if (!organizer)
        return res.status(400).send('Invalid organzier or not in database');

    let event = new Event({
        eventType: req.body.eventType,
        eventName: req.body.eventName,
        entry: req.body.entry,
        start: req.body.start,
        end: req.body.end,
        organizer: {
            _id: organizer._id,
            name: organizer.name,
            email: organizer.email,
            phone: organizer.phone
        },
        venue: {
            _id: venue._id,
            name: venue.name,
            email: venue.email,
            phone: venue.phone
        }
    });

    event = await event.save();
    res.send(event);
});


module.exports = router;