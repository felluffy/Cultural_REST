const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Venue, validateVenue } = require('../models/venue');
var authenticate = require('../authenticate');


// //endpoints
router.get('/', async (req, res) => {
    const venues = await Venue.find().sort('name');
    res.send(venues);
});

router.get('/date/:date', async (req, res) => {
    //retrieve all entries if they have a the request date in its dates array
    const venues = await Venue.find({ dates: req.params.date});
    if(!venues)
        return res.status(404).send('No venue in  ${req.paramas.date} was found');
    res.send(venues);
});

router.get('/name/:name', async(req, res) => {
    const venue = await Venue.find({ name: req.params.name });
    if(!venue)
        return res.status(404).send('The venue with the given name was not found.');
    res.send(venue);
});


router.get('/:id', async (req, res) => {
    const venue = await Venue.findById(req.params.id);

    if (!venue) 
        return res.status(404).send('The genre with the given ID was not found.');
    res.send(venue);
});

router.post('/',authenticate.verifyUser ,async (req, res) => {
    const { error } = validateVenue(req.body);
    
    if (error) {
        var message = error.details[0];
        //if (message.search("fails to match the required pattern"))
        //    message = "Invalid phone number";
        return res.status(400).send(message);
    }

    let venue = new Venue({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dates: req.body.dates
    });

    venue = await venue.save();
    res.send(venue);
});

router.put('/:id',authenticate.verifyUser ,async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const venue = await Venue.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        $push: { dates: req.body.dates }
    }, { new: true }); // to get the updated object 
    //venue.dates.push()

    if (!venue)
        return res.status(404).send('The Venue with the given ID was not found.');

    res.send(venue);
});

router.delete('/:id',authenticate.verifyUser ,async (req, res) => {
    const venue = await Venue.findByIdAndRemove(req.params.id);
    if (!venue)
        return res.status(404).send('The Venue with the given ID was not found.');

    res.send(venue);
});

module.exports = router;