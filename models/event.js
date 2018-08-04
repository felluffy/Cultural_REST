const Joi = require('joi');
const mongoose = require('mongoose');
const { organizerSchema } = require('./organizer');
const { periodSchema } = require('./period');
const { venueSchema } = require('./venue');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
        enum: ['General', 'Department', 'Extras']
    },
    eventName: {
        tpye: String,
        required: true
    },
    organizer: {
        type: organizerSchema,
        required: true
        //maybe don't let emails and phone numbers inside here, that's for later
    },
    period: {
        type: periodSchema,
        required: true
    },
    venue: {
        type: new mongoose.Schema({
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
            }
        }),
        required: true
    },
    
});
