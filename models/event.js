const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
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
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    entry: {
        type: String,
        required: true,
        enum: ['Restricted', 'Everyone']
    },
    // organizer: {
    //     type: organizerSchema,
    //     required: true
    //     //maybe don't let emails and phone numbers inside here, that's for later
    // },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    organizer: {
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
            },
            phone: {
                type: String,
                require: true,
                required: [true, 'User phone number required']
            }
        }),
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
            },
            phone: {
                type: String,
                require: true,
                required: [true, 'User phone number required']
            }
        }),
        required: true
    },

});

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event) {
    const schema = {
        eventType: Joi.string().required(),
        eventName: Joi.string().required().min(5).max(50),
        entry: Joi.string().required(),
        start: Joi.date().format('YYYY-MM-DD'),
        end: Joi.date().format('YYYY-MM-DD'),
        organizerId: Joi.objectId().required(),
        venueId: Joi.objectId().required()
    }

    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validateEvent = validateEvent;
exports.eventSchema = eventSchema;