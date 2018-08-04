const Joi = require('joi');
const mongoose = require('mongoose');
import { isEmail } from 'validator';

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
        validate: [isEmail, 'invalid email']
    },
    phone: {
        type: String,
        require: true,
        validator: function (v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!',
        required: [true, 'User phone number required']
    },
    date: {
        type: Date,
        required: false
    },
    availability: {
        type: Boolean,
        required: false
    }
});

const Venue = mongoose.model('Venue', venueSchema);

function validateVenue(venue) {
    const schema = {
      name: Joi.string().min(5).max(100).required(),
      phone: Joi.string.phoneNumber().required(),
      email: Joi.isEmail()
    };
  
    return Joi.validate(venue, schema);
}
    
exports.venueSchema = venueSchema;
exports.Venue = Venue;
exports.validateVenue = validateVenue;