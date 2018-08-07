const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Organizer, validateOrganizer } = require('../models/organizer');
var authenticate = require('../authenticate');
//endpoints
router.get('/', async (req, res) => {
    const organizers = await Organizer.find().sort('name');
    res.send(organizers);
});

router.get('/name/:name', async (req, res) => {
    const organizer = await Organizer.find({ name: req.params.name });
    if (!organizer)
        return res.status(404).send('The organizer with the given name was not found.');
    res.send(organizer)
});

router.get('/:id', async (req, res) => {
    const organizer = await Organizer.findById(req.params.id);

    if (!organizer) return res.status(404).send('The genre with the given ID was not found.');
    res.send(organizer);
});

router.post('/',authenticate.verifyUser , async (req, res) => {
    const { error } = validateOrganizer(req.body);
    if (error) {
        var message = error.details[0].message;
        if (message.search("fails to match the required pattern"))
            message = "Invalid phone number";
        return res.status(400).send(message);
    }

    let organizer = new Organizer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        underRU: req.body.underRU
    });

    organizer = await organizer.save();

    res.send(organizer);
});

router.put('/:id', authenticate.verifyUser ,async (req, res) => {
    const { error } = validateOrganizer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const organizer = await Organizer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body, email,
        phone: req.body.phone
    }, { new: true }); // to get the updated object 

    if (!organizer)
        return res.status(404).send('The organizer with the given ID was not found.');

    res.send(organizer);
});


module.exports = router;