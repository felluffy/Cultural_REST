
const mongoose = require('mongoose');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
//import { isEmail } from 'validator';

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: false,
        //validate: [isEmail, 'invalid email']
    },
    phone: {
        type: String,
        require: true,
        // validator: function (v) {
        //     return /\d{3}-\d{3}-\d{4}/.test(v);
        // },
        // message: '{VALUE} is not a valid phone number!',
        required: [true, 'User phone number required']
    },
    dates: {
        type: [Date],
        required: false
    },
    // availability: {
    //     type: Boolean,
    //     required: false
    // }
});

const Venue = mongoose.model('Venue', venueSchema);

function validateVenue(venue) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
        email: Joi.string().email(),
        dates: Joi.array().items(Joi.date().format('YYYY-MM-DD'))
    };

    return Joi.validate(venue, schema);
}

exports.venueSchema = venueSchema;
exports.Venue = Venue;
exports.validateVenue = validateVenue;